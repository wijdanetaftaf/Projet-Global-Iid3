import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')


def load_weather_data_multi_cities(data_path='archive/', cities_list=None):
    """
    Charge et fusionne tous les fichiers CSV pour plusieurs villes
    """
    print("Chargement des données...")
    
    # Charger les attributs des villes
    cities_df = pd.read_csv(data_path + 'city_attributes.csv')
    print(f"Villes disponibles : {cities_df.shape}")
    
    # Charger les données météo
    temperature = pd.read_csv(data_path + 'temperature.csv')
    humidity = pd.read_csv(data_path + 'humidity.csv')
    pressure = pd.read_csv(data_path + 'pressure.csv')
    wind_speed = pd.read_csv(data_path + 'wind_speed.csv')
    wind_direction = pd.read_csv(data_path + 'wind_direction.csv')
    
    print(f"Données chargées - Temperature shape: {temperature.shape}")
    
    # Si aucune liste de villes n'est fournie, prendre les 5 premières
    if cities_list is None:
        cities_list = [col for col in temperature.columns if col != 'datetime'][:5]
    
    print(f"Villes sélectionnées : {cities_list}")
    
    # Créer une liste pour stocker les DataFrames de chaque ville
    df_list = []
    
    for city in cities_list:
        # Vérifier si la ville existe dans les données
        if city not in temperature.columns:
            print(f"Ville '{city}' non trouvée, ignorée.")
            continue
        
        # Créer DataFrame pour cette ville
        df_city = pd.DataFrame({
            'datetime': pd.to_datetime(temperature['datetime']),
            'city': city,
            'temperature': temperature[city],
            'humidity': humidity[city],
            'pressure': pressure[city],
            'wind_speed': wind_speed[city],
            'wind_direction': wind_direction[city]
        })
        
        df_list.append(df_city)
        print(f"{city} : {df_city.shape[0]} lignes")
    
    # Concaténer tous les DataFrames
    df = pd.concat(df_list, ignore_index=True)
    
    # Trier par ville puis par date
    df = df.sort_values(['city', 'datetime']).reset_index(drop=True)
    
    print(f"\nDataFrame unifié créé : {df.shape}")
    print(f"Période : {df['datetime'].min()} à {df['datetime'].max()}")
    print(f"Nombre de villes : {df['city'].nunique()}")
    
    return df, cities_df


def explore_data(df):
    print("\n" + "="*60)
    print("📊 EXPLORATION DES DONNÉES")
    print("="*60)
    
    print("\n1. Informations générales :")
    print(df.info())
    
    print("\n2. Statistiques descriptives :")
    print(df.describe())
    
    print("\n3. Répartition par ville :")
    print(df['city'].value_counts())
    
    print("\n4. Valeurs manquantes par colonne :")
    missing = df.isnull().sum()
    print(missing)
    
    print("\n5. Valeurs manquantes par ville :")
    print(df.groupby('city').apply(lambda x: x.isnull().sum()))
    
    print("\n6. Valeurs aberrantes :")
    print(f"Temperature min: {df['temperature'].min()}, max: {df['temperature'].max()}")
    print(f"Humidity min: {df['humidity'].min()}, max: {df['humidity'].max()}")
    print(f"Pressure min: {df['pressure'].min()}, max: {df['pressure'].max()}")
    
    return df


def clean_data(df):
    print("\n🧹 Nettoyage des données...")
    
    df_clean_list = []
    
    # Nettoyer les données pour chaque ville séparément
    for city in df['city'].unique():
        df_city = df[df['city'] == city].copy()
        
        # Supprimer les lignes avec trop de valeurs manquantes
        df_city = df_city.dropna(thresh=len(df_city.columns) - 2)
        
        # Interpolation pour les valeurs manquantes restantes
        df_city = df_city.interpolate(method='linear', limit_direction='both')
        
        # Supprimer les doublons
        df_city = df_city.drop_duplicates(subset=['datetime'])
        
        # Gérer les valeurs aberrantes (méthode IQR) par ville
        for col in ['temperature', 'humidity', 'pressure', 'wind_speed']:
            Q1 = df_city[col].quantile(0.01)
            Q3 = df_city[col].quantile(0.99)
            IQR = Q3 - Q1
            df_city = df_city[(df_city[col] >= Q1 - 1.5*IQR) & (df_city[col] <= Q3 + 1.5*IQR)]
        
        df_clean_list.append(df_city)
        print(f"  ✅ {city} : {df_city.shape[0]} lignes après nettoyage")
    
    # Concaténer les données nettoyées
    df_clean = pd.concat(df_clean_list, ignore_index=True)
    df_clean = df_clean.sort_values(['city', 'datetime']).reset_index(drop=True)
    
    print(f"\n✅ Données nettoyées : {df_clean.shape}")
    
    return df_clean


cities_to_analyze = ['Vancouver', 'Portland', 'San Francisco', 'Seattle', 'Los Angeles']



df, cities_df = load_weather_data_multi_cities(
    data_path='D:\\IID3\\projet global\\archive (1)\\',
    cities_list=cities_to_analyze
)

explore_data(df)
df_clean = clean_data(df)


print("\n📌 Dataset prétraité (aperçu) :")
print(df_clean.head(10))

print("\n📌 Dataset prétraité par ville :")
for city in df_clean['city'].unique():
    print(f"\n{city}:")
    print(df_clean[df_clean['city'] == city].head(3))

print("\n📊 Statistiques descriptives après prétraitement :")
print(df_clean.groupby('city').describe())


plt.figure(figsize=(15, 8))

plt.subplot(2, 2, 1)
for city in df_clean['city'].unique():
    city_data = df_clean[df_clean['city'] == city]
    plt.plot(city_data['datetime'], city_data['temperature'], label=city, alpha=0.7)
plt.title('Température au fil du temps par ville')
plt.xlabel('Date')
plt.ylabel('Température (°C)')
plt.legend()
plt.xticks(rotation=45)

plt.subplot(2, 2, 2)
for city in df_clean['city'].unique():
    city_data = df_clean[df_clean['city'] == city]
    plt.plot(city_data['datetime'], city_data['humidity'], label=city, alpha=0.7)
plt.title('Humidité au fil du temps par ville')
plt.xlabel('Date')
plt.ylabel('Humidité (%)')
plt.legend()
plt.xticks(rotation=45)

plt.subplot(2, 2, 3)
for city in df_clean['city'].unique():
    city_data = df_clean[df_clean['city'] == city]
    plt.plot(city_data['datetime'], city_data['pressure'], label=city, alpha=0.7)
plt.title('Pression au fil du temps par ville')
plt.xlabel('Date')
plt.ylabel('Pression (hPa)')
plt.legend()
plt.xticks(rotation=45)

plt.subplot(2, 2, 4)
df_clean.boxplot(column='temperature', by='city', ax=plt.gca())
plt.title('Distribution des températures par ville')
plt.xlabel('Ville')
plt.ylabel('Température (°C)')
plt.suptitle('')
plt.xticks(rotation=45)

plt.tight_layout()
plt.show()

output_path = 'df_weather_clean_multi_cities.csv'
df_clean.to_csv(output_path, index=False)
print(f"\n💾 Dataset prétraité enregistré dans : {output_path}")
print(f"📊 Contenu : {df_clean.shape[0]} lignes, {df_clean['city'].nunique()} villes")
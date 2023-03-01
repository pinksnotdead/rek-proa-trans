# Transport AirCargo

## Instalacja
W konsoli wpisać:
```
echo `id -u`:`id -g`
```
następnie tą wartość wstawić w pliku docker-compose.yml L:12 (zamiast `user: '0:0'`)

Następnie zbudować kontenery i obrazy dockera
```
docker-compose up --build
```
Na koniec uruchomić backend
```
docker-compose exec php composer install
docker-compose exec php bin/console doctrine:migrations:migrate
docker-compose exec php bin/console doctrine:fixtures:load
```

Aplikacja jest dostępna pod adresem: http://localhost:3000


## Requests API

### Airplanes list
```
curl --location 'http://localhost/api/airplanes'
```

### Transport orders list
```
curl --location 'http://localhost/api/transports'
```
### Add transport order
```
curl --location 'http://localhost/api/transports' \
--header 'Content-Type: text/plain' \
--data '{
    "from": "Gdańsk",
    "to": "Honolulu",
    "date": "2023-02-20",
    "airplane": "Airbus A380",
    "cargo": [
        {
            "name": "Goldwasser",
            "weight": 9400,
            "type": "normal"
        },
        {
            "name": "Czekolada Bałtyk",
            "weight": 5600,
            "type": "dangerous"
        },
        {
            "name": "Piwo Złote Lwy",
            "weight": 3200,
            "type": "dangerous"
        }
    ]
}'
```
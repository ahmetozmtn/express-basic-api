# express-basic-api

Express.js kullanılarak geliştirilmiş basit bir API.

## Kurulum ve çalıştırma

#### Projeyi klonlayın

```shell
git clone GITHUB_URL
```

#### Proje klasörüne girin

```shell
cd express-basic-api
```

#### Bağımlılıklar Yükleyin

```shell
npm install
```

#### Projeyi çalıştırın

```shell
npm start
```

# Kullanım

Bu projede kullanılan HTTP metotları ve kullanımı aşağıdaki gibidir.

## GET

-   Tüm kayıtları döndürür.

    -   `http://localhost:3000/api/v1/users`

-   Girilen ID'ye ait kullanıcıyı döndürür;

    -   `http://localhost:3000/api/v1/users/:id`

-   Kullanıcın todo'larını döndürür

    -   `http://localhost:3000/api/v1/users/:id/todos`

## POST

-   Kullanıcı oluşturur.

    -   `http://localhost:3000/api/v1/users`

    -   Body;

        ```json
        {
            "id": 1,
            "username": "username",
            "password": "password",
            "todos": []
        }
        ```

-   Kullanıcıya todo ekler.

    -   `http://localhost:3000/api/v1/users/:id/todos`

    -   Body;

        ```json
        {
            "title": "title",
            "description": "description",
            "completed": false
        }
        ```

## PUT

-   Girilen ID'ye ait kullanıcı bilgilerini günceller.

    -   `http://localhost:3000/api/v1/users/:id`

    -   Body;

        ```json
        {
            "username": "username",
            "password": "password"
        }
        ```

-   Girilen ID'ye ait todo'yu günceller.

    -   `http://localhost:3000/api/v1/users/:id/todos/:todoId`

    -   Body;

        ```json
        {
            "title": "title",
            "description": "description",
            "completed": true
        }
        ```

## DELETE

-   Girilen ID'ye ait kullanıcı bilgilerini siler.

    -   `http://localhost:3000/api/v1/users/:id`

-   Tüm kullanıcıları siler.

    -   `http://localhost:3000/api/v1/users/all`

-   Girilen ID'ye ait kullanıcının todo'sunu siler.

    -   `http://localhost:3000/api/v1/users/:id/todos/:todoId`

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

-   ## GET

    Tüm kullanıcıları döndürür;

        `http://localhost:3000/api/v1/users`

    Girilen ID'ye ait kullanıcıyı döndürür;

        `http://localhost:3000/api/v1/users/:id`

    Kullanıcın todo'larını döndürür

        `http://localhost:3000/api/v1/users/:id/todos`

-   ## POST

    Kullanıcı oluşturur;

         `http://localhost:3000/api/v1/users`

        Body;

         ```
            {
                "id": 1,
                "username": "username",
                "password": "password",
                "todos": [
                    {
                        "id": 1,
                        "title": "title",
                        "description": "description",
                        "completed": false
                    },
                    {
                        "id": 2,
                        "title": "title",
                        "description": "description",
                        "completed": false
                    }
                ]
            }
         ```

-   ## PUT

    Girilen ID'ye ait kullanıcıyı günceller;

          `http://localhost:3000/api/v1/users/:id`

          Body;

          ```
              {
                  "id": 1,
                  "username": "username",
                  "password": "password",
                  "todos": [
                      {
                          "id": 1,
                          "title": "title",
                          "description": "description",
                          "completed": false
                      },
                      {
                          "id": 2,
                          "title": "title",
                          "description": "description",
                          "completed": false
                      }
                  ]
              }
          ```

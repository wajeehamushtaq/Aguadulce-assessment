# API Documentation

## Login
---

### Endpoint

**URL:** `/auth/login`

**Method:** `POST`

---
### Request Data

**Content-Type:** `application/json`

#### Body Parameters

| Parameter   | Type   | Description              |
|-------------|--------|--------------------------|
| `email`    | String | email of the user    |
| `password`    | String | password of the user  |


---

### Response Data

**Content-Type:** `application/json`

#### Success Response

**Status Code:** `200 OK`

```json
{
  "jwt":  "<jwt-token>" 
}
```

## Signup
---

### Endpoint

**URL:** `/auth/signup`

**Method:** `POST`

---
### Request Data

**Content-Type:** `application/json`

#### Body Parameters

| Parameter   | Type   | Description              |
|-------------|--------|--------------------------|
| `email`    | String | email of the user    |
| `password`    | String | password of the user  |
| `confirm_password`    | String | confirm password of the user  |
| `name`    | String | name of the user    |
| `username`    | String | username of the user  |

---

### Response Data

**Content-Type:** `application/json`

#### Success Response

**Status Code:** `200 OK`

```json
{
 "user": {
   "id": "1".
   "email": "test@gmail",
   "name": "test",
   "username": "test123",
   "password": "<bycrypted-password>",
 }
}
```

## Deploy Contract
---

### Endpoint

**URL:** `/auction/deploy`

**Method:** `POST`

---
### Request Data

**Content-Type:** `application/json`

#### Body Parameters

| Parameter   | Type   | Description              |
|-------------|--------|--------------------------|
| `endTime`    | Number | endtime to deploy    |

---

### Response Data

**Content-Type:** `application/json`

#### Success Response

**Status Code:** `200 OK`

```json
{
  "contract": {
    "id": 1,
    "address": "0x6ccEEE435345353453"
  }
}
```

## Get Auction
---

### Endpoint

**URL:** `/auction/:id/bids`

**Method:** `GET`

---
### Request Data

**Content-Type:** `application/json`
**Headers:** `Bearer <auth-token>`

### Response Data

**Content-Type:** `application/json`

#### Success Response

**Status Code:** `200 OK`

```json
{
  "list": [
    {
      "id": 1,
      "value": 0.0056,
      "bidder": "68099e145454df55454w45645646464d3"
    }
  ]
}
```
## Get Auction details
---

### Endpoint

**URL:** `/auction/:id/details`

**Method:** `GET`

---
### Request Data

**Content-Type:** `application/json`
**Headers:** `Bearer <auth-token>`

### Response Data

**Content-Type:** `application/json`

#### Success Response

**Status Code:** `200 OK`

```json
{
  "highestBid": "0.0",
  "auctionStatus": "Active"
}
```

## Place a Bid
---

### Endpoint

**URL:** `/auction/bid`

**Method:** `POST`

---
### Request Data

**Content-Type:** `application/json`

#### Body Parameters

| Parameter   | Type   | Description              |
|-------------|--------|--------------------------|
| `bidder`    | String | bidder address    |
| `value`    | Number | value to bid    |
| `auctionID`    | Number | auction ID    |

---

### Response Data

**Content-Type:** `application/json`

#### Success Response

**Status Code:** `200 OK`

```json
{
  "bid": {
    "bidder": "6896273723576312617627162172617",
    "value": 0.000112,
    "auctionID": 1,
    "id": 1
  }
}
```




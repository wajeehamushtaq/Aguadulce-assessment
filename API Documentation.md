# API Documentation

## Auction Get

Get all the bids made
---

### Endpoint

**URL:** `/auction`

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

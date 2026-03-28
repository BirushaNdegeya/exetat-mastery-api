# Questions API Documentation For Frontend Admin

This document describes how the frontend admin can implement full CRUD for `questions`.

## Overview

A question belongs to a `test_year` block.

Each question has:
- `question_text`
- `options` with exactly 5 choices: `option1` to `option5`
- `correctAnswer` as a number from `1` to `5`
- `explanation`
- `test_year_id`
- optional `passage`

The answer is not the option text. It is the option number.

Example:
- `correctAnswer: 3`
- means `options.option3` is the correct choice

---

## Question Shape

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "question_text": "Quelle est la capitale de la RDC ?",
  "options": {
    "option1": "Kinshasa",
    "option2": "Lubumbashi",
    "option3": "Goma",
    "option4": "Matadi",
    "option5": "Bukavu"
  },
  "correctAnswer": 1,
  "explanation": "Kinshasa est la capitale.",
  "test_year_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "passage": null,
  "createdAt": "2026-03-28T10:00:00.000Z",
  "updatedAt": "2026-03-28T10:00:00.000Z"
}
```

---

## Auth

Admin write endpoints require:

```http
Authorization: Bearer <token>
```

Protected endpoints:
- `POST /years/:yearId/questions`
- `POST /questions/bulk`
- `PUT /questions/:id`
- `DELETE /questions/:id`

Read endpoints are public unless your app wraps them differently.

---

## Validation Rules

## Required fields on create

- `question_text`: string
- `options.option1`: string
- `options.option2`: string
- `options.option3`: string
- `options.option4`: string
- `options.option5`: string
- `correctAnswer`: number from `1` to `5`
- `explanation`: string
- `test_year_id`: required only for bulk create endpoint
- `passage`: optional, can be `null`

## Update

All fields are optional on update.

---

## Endpoints

## 1. List Questions

### `GET /questions`

Returns paginated questions with optional filters.

### Query params

- `subject_id` optional
- `test_year_id` optional
- `year` optional
- `search` optional
- `page` optional, default `1`
- `limit` optional, default `20`

### Example

```http
GET /questions?test_year_id=f47ac10b-58cc-4372-a567-0e02b2c3d479&page=1&limit=20&search=capitale
```

### Response

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "question_text": "Quelle est la capitale de la RDC ?",
      "options": {
        "option1": "Kinshasa",
        "option2": "Lubumbashi",
        "option3": "Goma",
        "option4": "Matadi",
        "option5": "Bukavu"
      },
      "correctAnswer": 1,
      "explanation": "Kinshasa est la capitale.",
      "test_year_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "passage": null
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 20
  }
}
```

---

## 2. Get Random Questions

### `GET /questions/random`

Returns a random shuffled list.

### Query params

- `subject_id` optional
- `year` optional
- `limit` optional, default `7`

### Example

```http
GET /questions/random?year=2024&limit=10
```

### Response

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "question_text": "Quelle est la capitale de la RDC ?",
    "options": {
      "option1": "Kinshasa",
      "option2": "Lubumbashi",
      "option3": "Goma",
      "option4": "Matadi",
      "option5": "Bukavu"
    },
    "correctAnswer": 1,
    "explanation": "Kinshasa est la capitale.",
    "test_year_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "passage": null
  }
]
```

---

## 3. Get Question By ID

### `GET /questions/:id`

### Example

```http
GET /questions/550e8400-e29b-41d4-a716-446655440000
```

### Response

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "question_text": "Quelle est la capitale de la RDC ?",
  "options": {
    "option1": "Kinshasa",
    "option2": "Lubumbashi",
    "option3": "Goma",
    "option4": "Matadi",
    "option5": "Bukavu"
  },
  "correctAnswer": 1,
  "explanation": "Kinshasa est la capitale.",
  "test_year_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "passage": null,
  "createdAt": "2026-03-28T10:00:00.000Z",
  "updatedAt": "2026-03-28T10:00:00.000Z"
}
```

---

## 4. List Questions By Year Block

### `GET /years/:yearId/questions`

Use this when the admin is inside one year block screen.

### Query params

- `page` optional
- `limit` optional
- `search` optional

### Example

```http
GET /years/f47ac10b-58cc-4372-a567-0e02b2c3d479/questions?page=1&limit=20
```

### Response

Same paginated response shape as `GET /questions`.

---

## 5. Create Question For A Year Block

### `POST /years/:yearId/questions`

This is the main admin create endpoint when a year block is already known.

### Request body

```json
{
  "question_text": "Quelle est la capitale de la RDC ?",
  "options": {
    "option1": "Kinshasa",
    "option2": "Lubumbashi",
    "option3": "Goma",
    "option4": "Matadi",
    "option5": "Bukavu"
  },
  "correctAnswer": 1,
  "explanation": "Kinshasa est la capitale.",
  "passage": null
}
```

### Notes

- Do not send `test_year_id` here
- `yearId` comes from the URL
- `correctAnswer` must be `1`, `2`, `3`, `4`, or `5`

### Success response

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "question_text": "Quelle est la capitale de la RDC ?",
  "options": {
    "option1": "Kinshasa",
    "option2": "Lubumbashi",
    "option3": "Goma",
    "option4": "Matadi",
    "option5": "Bukavu"
  },
  "correctAnswer": 1,
  "explanation": "Kinshasa est la capitale.",
  "test_year_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "passage": null
}
```

---

## 6. Bulk Create Questions

### `POST /questions/bulk`

Use this for CSV/import workflows.

### Request body

```json
[
  {
    "question_text": "Quelle est la capitale de la RDC ?",
    "options": {
      "option1": "Kinshasa",
      "option2": "Lubumbashi",
      "option3": "Goma",
      "option4": "Matadi",
      "option5": "Bukavu"
    },
    "correctAnswer": 1,
    "explanation": "Kinshasa est la capitale.",
    "test_year_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "passage": null
  },
  {
    "question_text": "2 + 2 = ?",
    "options": {
      "option1": "1",
      "option2": "2",
      "option3": "3",
      "option4": "4",
      "option5": "5"
    },
    "correctAnswer": 4,
    "explanation": "2 + 2 = 4.",
    "test_year_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "passage": null
  }
]
```

### Success response

Returns an array of created questions.

---

## 7. Update Question

### `PUT /questions/:id`

### Request body

```json
{
  "question_text": "Quelle est la vraie capitale de la RDC ?",
  "options": {
    "option1": "Kinshasa",
    "option2": "Lubumbashi",
    "option3": "Goma",
    "option4": "Matadi",
    "option5": "Bukavu"
  },
  "correctAnswer": 1,
  "explanation": "Kinshasa est la capitale officielle.",
  "test_year_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "passage": null
}
```

### Notes

- All fields are optional
- You can move a question to another year block by sending a new `test_year_id`
- If updating options, frontend should usually send the full `options` object

### Success response

Returns the updated question object.

---

## 8. Delete Question

### `DELETE /questions/:id`

### Example

```http
DELETE /questions/550e8400-e29b-41d4-a716-446655440000
```

### Success response

```json
{
  "message": "Question deleted successfully"
}
```

---

## Frontend Form Mapping

## Suggested create/edit form fields

- Question text
- Option 1
- Option 2
- Option 3
- Option 4
- Option 5
- Correct answer
- Explanation
- Passage

## Suggested payload mapping

```ts
const payload = {
  question_text: form.question_text,
  options: {
    option1: form.option1,
    option2: form.option2,
    option3: form.option3,
    option4: form.option4,
    option5: form.option5,
  },
  correctAnswer: Number(form.correctAnswer),
  explanation: form.explanation,
  passage: form.passage || null,
};
```

## UI recommendation for correct answer

Use a select or radio group with fixed values:
- `1`
- `2`
- `3`
- `4`
- `5`

Label them clearly:
- `Option 1`
- `Option 2`
- `Option 3`
- `Option 4`
- `Option 5`

---

## Admin CRUD Flow Recommendation

## List page

Use:
- `GET /questions`
- or `GET /years/:yearId/questions` if admin is inside a year block

Features:
- search
- pagination
- filter by `subject_id`
- filter by `year`
- filter by `test_year_id`

## Create page or modal

Use:
- `POST /years/:yearId/questions`

## Edit page or modal

Use:
- `GET /questions/:id`
- `PUT /questions/:id`

## Delete action

Use:
- `DELETE /questions/:id`

## Bulk import

Use:
- `POST /questions/bulk`

---

## Error Handling

Common statuses:
- `200` success
- `201` created
- `401` unauthorized
- `403` forbidden
- `404` question or year block not found

Frontend should show friendly messages for:
- invalid token
- insufficient permissions
- question not found
- year block not found
- validation errors

---

## Important Notes For Frontend Team

- `correctAnswer` is numeric, not string
- `correctAnswer` refers to the option index, not the option label text
- `options` is an object, not an array
- always send 5 options for create
- `passage` is optional and can be `null`
- for create inside a year block, use the URL param `yearId`
- for bulk create, each item must include `test_year_id`

---

## TypeScript Types For Frontend

```ts
export type QuestionOptions = {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option5: string;
};

export type Question = {
  id: string;
  question_text: string;
  options: QuestionOptions;
  correctAnswer: 1 | 2 | 3 | 4 | 5 | number;
  explanation: string;
  test_year_id: string;
  passage?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateQuestionPayload = {
  question_text: string;
  options: QuestionOptions;
  correctAnswer: number;
  explanation: string;
  passage?: string | null;
};

export type BulkCreateQuestionPayload = {
  question_text: string;
  options: QuestionOptions;
  correctAnswer: number;
  explanation: string;
  test_year_id: string;
  passage?: string | null;
};

export type UpdateQuestionPayload = Partial<{
  question_text: string;
  options: QuestionOptions;
  correctAnswer: number;
  explanation: string;
  test_year_id: string;
  passage: string | null;
}>;
```

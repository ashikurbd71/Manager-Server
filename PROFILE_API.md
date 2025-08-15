# Profile API Documentation

This document describes the profile management endpoints for the NestJS application.

## Base URL

All endpoints are prefixed with `/profile` and require JWT authentication.

## Authentication

All endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Get User Profile

**GET** `/profile`

Returns the complete profile information for the authenticated user.

**Response:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "member",
  "status": 1,
  "userName": {
    "id": 1,
    "name": "John Doe",
    "fatherName": "Father Name",
    "motherName": "Mother Name",
    "fatherNumber": "1234567890",
    "motherNumber": "0987654321",
    "brithCertifecate": "ABC123",
    "number": "1234567890",
    "session": "2023-24",
    "nid": "1234567890123456",
    "address": "123 Main St",
    "email": "user@example.com",
    "joiningDate": "2023-01-01T00:00:00.000Z",
    "profile": "uploads/profile-1234567890.jpg",
    "code": "M001",
    "status": 1,
    "instituteName": {
      "id": 1,
      "name": "Example Institute"
    },
    "department": {
      "id": 1,
      "name": "Computer Science"
    },
    "semister": {
      "id": 1,
      "name": "1st Semester"
    },
    "bloodGroup": {
      "id": 1,
      "name": "A+"
    }
  }
}
```

### 2. Get Profile Statistics

**GET** `/profile/stats`

Returns profile statistics for the authenticated user.

**Response:**

```json
{
  "totalLogins": 0,
  "lastLogin": "2023-12-01T10:00:00.000Z",
  "accountCreated": "2023-01-01T00:00:00.000Z",
  "status": "Active"
}
```

### 3. Update Profile

**PUT** `/profile`

Updates the user's profile information.

**Request Body:**

```json
{
  "name": "Updated Name",
  "fatherName": "Updated Father Name",
  "motherName": "Updated Mother Name",
  "fatherNumber": "1234567890",
  "motherNumber": "0987654321",
  "number": "1234567890",
  "session": "2023-24",
  "nid": "1234567890123456",
  "address": "Updated Address",
  "email": "updated@example.com",
  "position": "Updated Position",
  "instituteName": 1,
  "department": 1,
  "semister": 1,
  "bloodGroup": 1
}
```

**Response:**

```json
{
  "id": 1,
  "email": "updated@example.com",
  "role": "member",
  "status": 1,
  "userName": {
    // Updated profile data
  }
}
```

### 4. Change Password

**POST** `/profile/change-password`

Changes the user's password.

**Request Body:**

```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123",
  "confirmPassword": "newPassword123"
}
```

**Response:**

```json
{
  "message": "Password changed successfully"
}
```

### 5. Upload Profile Picture

**POST** `/profile/upload-picture`

Uploads a new profile picture.

**Request:**

- Content-Type: `multipart/form-data`
- Field name: `profile`
- File types: jpg, jpeg, png, gif
- Max file size: 5MB

**Response:**

```json
{
  "message": "Profile picture updated successfully",
  "profile": "uploads/profile-1234567890.jpg"
}
```

### 6. Get Profile Picture

**GET** `/profile/download-picture`

Returns the profile picture path for the authenticated user.

**Response:**

```json
{
  "profilePicture": "uploads/profile-1234567890.jpg"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": "Email already exists",
  "error": "Bad Request"
}
```

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Current password is incorrect",
  "error": "Unauthorized"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

## Usage Examples

### Frontend Integration (JavaScript/React)

```javascript
// Get user profile
const getProfile = async () => {
  const response = await fetch('/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

// Update profile
const updateProfile = async (profileData) => {
  const response = await fetch('/profile', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });
  return await response.json();
};

// Change password
const changePassword = async (passwordData) => {
  const response = await fetch('/profile/change-password', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(passwordData),
  });
  return await response.json();
};

// Upload profile picture
const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append('profile', file);

  const response = await fetch('/profile/upload-picture', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return await response.json();
};
```

## Notes

1. All endpoints require authentication via JWT token
2. Profile pictures are stored in the `uploads/` directory
3. File uploads are limited to 5MB and image files only
4. Password changes require current password verification
5. Email updates check for uniqueness across all users
6. Profile updates work for both member and manager user types

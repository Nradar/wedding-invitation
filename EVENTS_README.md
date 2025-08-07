# Timeline Events Cloud Database Setup

This document explains how to set up the timeline events to pull from the cloud database instead of hardcoded data.

## Changes Made

### 1. New Cloud Function: `events`

Created a new cloud function in `cloudfunctions/events/` that handles:
- **GET**: Retrieve the timeline array from the database (read-only)

### 2. Modified Timeline Page

Updated `miniprogram/pages/timeline/index.js` to:
- Load activities from cloud database instead of hardcoded data
- Added loading state management
- Added error handling for network requests
- Added automatic refresh when page is shown

### 3. Updated UI

Modified `miniprogram/pages/timeline/index.wxml` and `miniprogram/pages/timeline/index.wxss` to:
- Show loading spinner while fetching data
- Handle empty states gracefully

## Setup Instructions

### Step 1: Deploy the Events Cloud Function

1. In the WeChat Developer Tools, right-click on `cloudfunctions/events/`
2. Select "Upload and Deploy: Cloud Function"
3. Wait for the deployment to complete

### Step 2: Create the Events Database Collection

1. Go to the WeChat Cloud Development Console
2. Navigate to Database → Collections
3. Create a new collection named `events`
4. Set permissions to "All users can read, only creators can write"

### Step 3: Update Cloud Function Permissions

1. In the Cloud Development Console, go to Cloud Functions
2. Find the `events` function
3. Click on "Permission Settings"
4. Set to "Allow all users to access" to enable sharing functionality

## Database Schema

The `events` collection contains a single document with the following structure:

```javascript
{
  _id: "auto-generated",
  timeline: [                   // Array of timeline events
    {
      id: 1,                    // Event ID
      startTime: "07:30",       // Event start time (HH:MM format)
      endTime: "08:00",         // Event end time (HH:MM format)
      location: "酒店总统包房",  // Event location
      project: "新娘准备",      // Event title/project name
      content: "新娘起床洗漱...", // Event description
      remarks: "",              // Additional remarks
      icon: "💄",               // Event icon (emoji)
      status: "pending"         // Event status (pending/current/completed)
    },
    // ... more events
  ],
  _openid: "user-openid",       // Creator's openid
  createdAt: Date,              // Creation timestamp
  updatedAt: Date               // Last update timestamp (optional)
}
```

## Benefits of Cloud Database

1. **Dynamic Updates**: Events can be updated without redeploying the app
2. **Real-time Sync**: Changes are immediately reflected across all users
3. **Scalability**: Can handle multiple events and complex scheduling
4. **Backup & Recovery**: Data is safely stored in the cloud
5. **Admin Management**: Events can be managed through admin interfaces

## Troubleshooting

### Common Issues

1. **Events not loading**: Check if the cloud function is deployed and has correct permissions
2. **Permission errors**: Ensure the `events` collection has proper read permissions
3. **Empty timeline**: Ensure the database has timeline data in the correct format
4. **Network errors**: Check internet connection and cloud function status

### Debug Steps

1. Check the browser console for error messages
2. Verify cloud function deployment status
3. Test cloud function directly in the console
4. Check database collection permissions
5. Verify the events collection has data

## Future Enhancements

Potential improvements for the timeline system:

1. **Admin Interface**: Add ability to manage events through the admin page
2. **Event Categories**: Group events by type (ceremony, reception, etc.)
3. **Real-time Updates**: Use WebSocket for live updates
4. **Event Templates**: Predefined event templates for different wedding types
5. **Multi-language Support**: Support for different languages
6. **Event Notifications**: Push notifications for upcoming events 
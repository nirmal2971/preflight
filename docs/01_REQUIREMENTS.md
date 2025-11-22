# 1. Requirement Analysis — Pre-Flight Checklist Application

## 1.1 Overview
The goal of this system is to build a simple full-stack CRUD web application for managing a Pre-Flight Checklist. The system allows users to add, update, delete, and track the status of pre-flight checks.

The design follows the reference layout given in the assessment PDF.

## 1.2 Core Functionalities
- Add new pre-flight checklist items
- View list of all checklist items
- Update status (Completed / Not Completed)
- Add or update comments for each check
- Delete a specific check
- Display static flight information above checklist

## 1.3 User Interface Requirements
- Single-page application layout
- Clean, readable table layout similar to assessment example
- Columns:
  - CHECKS
  - STATUS
  - COMMENTS
  - ACTIONS
- Add section for entering new checklist entries
- Flight information displayed above checklist

## 1.4 Interaction Requirements
- Users can toggle completion status
- Users can edit comments directly inside the table
- Users can delete rows
- All changes should be updated in backend (CRUD)
- Data loads automatically from backend on page load

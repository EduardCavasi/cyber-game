# Cyber Detective - Educational Cybersecurity Game

A React-based educational game designed to teach children about cybersecurity concepts through an interactive detective-style game.

## Game Concept

In this game, players take on the role of a security specialist investigating a data breach at their company. The player must search for clues, crack passwords, and use cyber forensics skills to determine where their colleague has fled with stolen company data.

## Educational Value

This game teaches several important cybersecurity concepts:
- Password security (why personal information makes poor passwords)
- The importance of securing sensitive data
- Basic digital forensics techniques
- Awareness of insider threats
- Critical thinking and problem-solving in security scenarios

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Game Assets - AI Image Generation Guide

Before running the game in production, you need to create custom images for each scene. Here are prompts you can use with AI image generation tools (like DALL-E, Midjourney, or Stable Diffusion) to create matching images:

### 1. Office Scene (`/office.jpg`):
```
A detailed, realistic office desk with a computer monitor, keyboard and mouse. On the desk, there's a yellow sticky note, drawer handles visible below. To the left, there's a bookshelf with books including one titled "Password Security". On the right side, a trash bin with visible crumpled papers. The scene should look like someone left in a hurry.
```

### 2. Computer Desktop (`/desktop.jpg`):
```
A computer desktop screen with a clean interface. Visible icons for Email Client, Files Folder, and Web Browser should be arranged on the left side. The desktop background should be blue or teal colored. Include a small "back" button in the bottom right corner.
```

### 3. Email Client (`/email.jpg`):
```
An email client interface resembling Outlook, with a list of emails on display. Three emails should be clearly visible: "Flight Confirmation" from bookings@travel.com, "Password Security Reminder" from it@company.com, and "Paradise Cove Booking" from reservations@paradisecove.com. Include navigation elements and a back button.
```

### 4. Files Folder (`/files.jpg`):
```
A file explorer window showing several files. Two files should be prominently displayed: "Company Secrets.pdf" and "Personal Information.txt". The interface should be clean and modern with a purple or dark blue theme. Include a back button in the corner.
```

### 5. Web Browser (`/browser.jpg`):
```
A web browser window showing search results for "Fiji resorts". The page should display Paradise Cove Resort prominently, with a map location visible. The browser interface should include typical browser elements like address bar and tabs. Include a back button in the corner.
```

Once you've generated these images, place them in the `/public/images` directory with the exact filenames specified above.

## Image Placement Guidelines

For the images to work properly with the clickable areas:

1. **Office Scene**: Place the computer in the center, sticky note on the upper right, drawer below the desk, trash bin on the far right, and bookshelf on the left side.

2. **Computer Desktop**: Place the icons (Email, Files, Browser) on the left side of the screen, vertically aligned, and the back button in the bottom right.

3. **Email Client**: Display three distinct emails that take up the center of the screen, with their subjects clearly visible, and a back button in the bottom left.

4. **Files Folder**: Show two prominent files in the center area, with the back button in the bottom left.

5. **Browser**: Display search results in the center area with a map location for Paradise Cove Resort, and a back button in the bottom left.

## Technologies Used

- React.js with TypeScript
- Styled Components for styling
- React Context for state management

## How to Play

1. Click on objects in the room to investigate them
2. Collect important items that will be added to your inventory
3. Use clues to deduce passwords and access locked content
4. Track your progress with the investigation progress bar
5. Find all clues to determine where your colleague has fled

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- Additional scenarios and levels with different cybersecurity challenges
- More interactive elements and mini-games
- A scoring system based on time and number of attempts
- Localization support for multiple languages

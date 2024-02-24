# Project Walkthrough

## PART 1: Demo
1. Demonstarte Each of the Nav bar options
2. Demonstrate Save/Load/Random
3. Demonstrate Backend API - CANVAS / ID / RANDOM

## PART 2: Engineer Walkthrough
### Frontend
1. App.js
   1. Import React and Sketchbook
2. Api.js
   1. makes http requests to backend
3. Sketchbook.js
   1. LINES 1-13 = imports
   2. LINES 15-99 = handle canvas
      1. 15-35 init
      2. 27-36 update canvas
      3. 38-52 window resize
      4. 58-70 pressure sensitivity
      5. 72-98 pointer down - pressure
      6. 100-138 paperclip
      7. 140-178 eraser
      8. 180-219 pencil
      9. 221-243 circle
      10. 245-270 square
      11. 272-297 toggledrawing
      12. 299-369 random canvas
      13. 371-394 save canvas
      14.  396-399 clear canvas
      15.  400-417 export canvas
      16.  419-421 brush size
      17.  423-425 brush color
      18.  427+ return
4. Navigation.js
   1. import
   2. LINES 27-45 mouse events - color
   3. lines 47-59 toggle drawing mode
   4. return
5. ControlPanel.js

### Backend 
1. Server.js
2. App.js
3. Routes.js
   1. 6-13 GET Canvas
   2. 16-25 Post Canvas
   3. 28-41 Get Canvas by ID
   4. 44-56 Get Random Canvas
   5. 
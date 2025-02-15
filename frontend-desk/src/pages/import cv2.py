import cv2

# Initialize camera
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 640)

# List to store points
points = []
current_mouse_position = (0, 0)  # Variable to store real-time mouse position

# Mouse callback function to capture points on click and update real-time position
def mouse_callback(event, x, y, flags, param):
    global current_mouse_position
    current_mouse_position = (x, y)  # Update mouse position

    if event == cv2.EVENT_LBUTTONDOWN:
        points.append((x, y))  # Store point on click

# Set mouse callback
cv2.namedWindow("Camera Feed")
cv2.setMouseCallback("Camera Feed", mouse_callback)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Resize the frame to 640x640
    frame = cv2.resize(frame, (640, 640))

    # Display real-time mouse position
    cv2.putText(frame, f"Mouse Position: {current_mouse_position}", (10, 30), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

    # Draw all points
    for point in points:
        cv2.circle(frame, point, 5, (0, 0, 255), -1)

    # Show the frame
    cv2.imshow("Camera Feed", frame)

    # Break on 'q' key
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()

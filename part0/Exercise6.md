```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server

    Note left of browser: Browser sends user input and rerenders page using JS

    Note right of server: Server processes POST request and adds note to storage
    deactivate server




```

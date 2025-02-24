```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server

    Note right of browser: Browser sends user input

    Note right of server: Server processes POST request and adds note to storage

    browser->>browser: Rerenders page using JS

    server-->>browser: { "message": "note created" }
    deactivate server




```

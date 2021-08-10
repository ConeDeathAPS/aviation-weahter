export default function html(body: string): string {
    return `<html lang="en">
    <head>
    <title>Aviation Weather</title>
    <link rel="stylesheet" type="text/css" href="app.css" />
    </head>
    <body>
        <main id="app-container">${body}</main>
        <script src="app.js"></script>
    </body>
    </html>`
}
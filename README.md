# antTable — Test task

A small React + Vite application with an Ant Design spreadsheet that implements CRUD, sorting and searching through all cells.

Functional:

- A table with columns: `Name', `Date', `Value', `Actions'.
- The "Add" button opens a modal window with the form (validation). A new record is added to the table.
- Edit: The edit button opens a modal window filled with data; the changes are saved in the row.
- Delete: The delete confirmation button deletes the row.
- Sorting by all columns is implemented via AntD (rows, dates, numbers).
- Search through all cells — the field above the table.

Established dependencies (key ones): `react`, `react-dom`, `antd`, `@ant-design/icons`, `dayjs`, `lodash`.

Where to watch:

- Table component: [src/App.jsx](src/App.jsx)
- Scripts and dependencies: [package.json](package.json)

Running locally:

```bash
npm install
npm run dev
```

The application will be available locally at the address specified by Vite (by default `http://localhost:5173 /`, Vite can choose a different port).

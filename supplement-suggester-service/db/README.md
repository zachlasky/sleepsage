# Resources

## Postgres

[database/sql Docs](https://pkg.go.dev/database/sql)

[database/sql Video](https://youtu.be/Y7a0sNKdoQk?si=jRKukEUhBXaR5F75)

## Migrations (Shouldn't be run since we're now storing data in Supabase)

[Goose Docs](https://github.com/pressly/goose)

[Goose Video](https://youtu.be/fA8QK69zwlw?si=0AR4AtO0BPGI-WaB)

Run Migration

- `cd db/migrations`

- `goose postgres <db-connection-url> <up or down>`

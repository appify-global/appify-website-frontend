
## Running the Application Locally

### 1. Setting up the WASM Files

The `wasm_release` artifacts are pre-built and ready to use.

```bash
# Navigate to the Rust directory
cd rust

# Ensure the pkg directory exists
mkdir -p pkg

# Download the release package
wget -O pkg/pkg.zip https://github.com/ebadfd/appify-web/releases/download/0.0.1/pkg.zip

# Extract the package into the pkg directory
unzip -o pkg/pkg.zip -d pkg
```

### 2. Running the Development Server

```bash
# Prepare the development environment
nix-develop

# Start the dev server
pnpm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Generating Articles

To manually trigger article generation on Railway:

```bash
# Set API key (get from Railway Variables)
$env:API_KEY = "your-secret-api-key-for-write-endpoints"

# Generate article
npm run generate-article
```

See [GENERATE_ARTICLE.md](./GENERATE_ARTICLE.md) for details.
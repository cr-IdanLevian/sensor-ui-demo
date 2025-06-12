# SensorUI - WebView2 React Application

A modern React + TypeScript application designed to work seamlessly with C# WPF applications through WebView2 integration.

## 📋 Overview

This application provides a context menu-style interface with:
- Real-time status display (Connection & App Status)
- Interactive menu buttons (Refresh, Settings, About, Exit)
- Bidirectional communication with C# backend via WebView2
- Multi-language support (English, Hebrew, Japanese)
- RTL/LTR layout support with proper text direction
- Modern, responsive design with smooth animations

## 🚀 Development

### Prerequisites
- Node.js 18+ 
- Yarn package manager

### Getting Started

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# The app will be available at http://localhost:5173
```

### Build for Production

```bash
# Build the application
yarn build

# The build output will be in the `dist/` folder
```

### Other Commands

```bash
# Run linting
yarn lint

# Preview production build
yarn preview
```

## 📦 Distribution

After running `yarn build`, provide the entire `dist/` folder to your C# developer. The folder contains:
- `index.html` - Main entry point
- `assets/` - JavaScript, CSS, and other static assets
- All files use relative paths for WebView2 compatibility

## 🔗 C# WebView2 Integration

### Loading the Application

```csharp
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.Wpf;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        InitializeWebView();
    }

    private async void InitializeWebView()
    {
        // Wait for WebView2 to be ready
        await webView.EnsureCoreWebView2Async();
        
        // Load the React application
        webView.Source = new Uri($"file:///{Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "dist", "index.html")}");
        
        // Set up host object for communication
        webView.CoreWebView2.AddHostObjectToScript("csharpHost", new CSharpHostObject());
    }
}
```

### Creating the Host Object

```csharp
using System.Runtime.InteropServices;

[ComVisible(true)]
public class CSharpHostObject
{
    public void OnRefreshClick()
    {
        // Handle refresh button click
        Console.WriteLine("Refresh clicked");
        // Your refresh logic here
    }

    public void OnSettingsClick()
    {
        // Handle settings button click
        Console.WriteLine("Settings clicked");
        // Open settings window/dialog
    }

    public void OnAboutClick()
    {
        // Handle about button click
        Console.WriteLine("About clicked");
        // Show about dialog
    }

    public void OnExitClick()
    {
        // Handle exit button click
        Console.WriteLine("Exit clicked");
        Application.Current.Shutdown();
    }
}
```

### Sending Status Updates to React

```csharp
// Method to update the React frontend with new status
private async void UpdateStatus(string connectionStatus, string appStatus)
{
    var message = new
    {
        type = "updateStatus",
        payload = new
        {
            connection = connectionStatus,
            status = appStatus
        }
    };

    var script = $"window.postMessage({JsonSerializer.Serialize(message)}, '*');";
    await webView.CoreWebView2.ExecuteScriptAsync(script);
}

// Method to update the language
private async void UpdateLanguage(string language)
{
    var message = new
    {
        type = "updateLanguage",
        payload = new
        {
            language = language
        }
    };

    var script = $"window.postMessage({JsonSerializer.Serialize(message)}, '*');";
    await webView.CoreWebView2.ExecuteScriptAsync(script);
}

// Example usage
private void OnConnectionChanged()
{
    UpdateStatus("Connected", "Ready");
}

private void OnApplicationError()
{
    UpdateStatus("Disconnected", "Error");
}

private void OnLanguageChanged(string newLanguage)
{
    UpdateLanguage(newLanguage); // "en", "he", or "ja"
}
```

### Alternative Script Execution Method

```csharp
// Direct function call (if you prefer this approach)
private async void UpdateStatusDirect(string connection, string status)
{
    var script = $"if (window.updateStatus) {{ window.updateStatus('{connection}', '{status}'); }}";
    await webView.CoreWebView2.ExecuteScriptAsync(script);
}
```

## 📡 Communication Protocol

### React → C# (Button Clicks)

The React application calls C# methods using:
```javascript
window.chrome.webview.hostObjects.csharpHost.OnRefreshClick();
window.chrome.webview.hostObjects.csharpHost.OnSettingsClick();
window.chrome.webview.hostObjects.csharpHost.OnAboutClick();
window.chrome.webview.hostObjects.csharpHost.OnExitClick();
```

### C# → React (Status Updates & Language Changes)

C# sends status updates and language changes using `postMessage`:

**Status Update Message:**
```javascript
{
  type: "updateStatus",
  payload: {
    connection: "Connected" | "Disconnected" | "Connecting",
    status: "Ready" | "Initializing" | "Error"
  }
}
```

**Language Update Message:**
```javascript
{
  type: "updateLanguage",
  payload: {
    language: "en" | "he" | "ja"
  }
}
```

## 📊 Status Types

### Connection Status
- `Connected` - Successfully connected (Green)
- `Disconnected` - Not connected (Red)
- `Connecting` - Connection in progress (Yellow)

### App Status
- `Ready` - Application ready (Green)
- `Initializing` - Starting up (Yellow)
- `Error` - Error state (Red)

## 🌐 Internationalization

### Supported Languages
- **English (`en`)** - Left-to-Right (LTR)
- **Hebrew (`he`)** - Right-to-Left (RTL)  
- **Japanese (`ja`)** - Left-to-Right (LTR)

### Language Files
Edit `src/i18n/translations.ts` to:
- Add new languages
- Update existing translations
- Modify status text and button labels

### Adding New Languages
1. Add language code to `Language` type in `translations.ts`
2. Add translation object to `translations` constant
3. Update `getLanguageDirection()` if RTL support needed
4. Add font stack in `styles.css` for proper text rendering

### RTL Support
The application automatically:
- Sets `document.dir` and `document.lang` attributes
- Applies RTL-specific CSS classes
- Reverses icon/text positioning
- Uses appropriate font stacks

## 🎨 Customization

### Styling
Edit `src/styles.css` to customize the appearance:
- Colors and themes
- Typography and fonts
- Layout and spacing
- Animations and transitions
- RTL/LTR specific styles

### Components
- `StatusSection.tsx` - Status display logic with translations
- `MenuButton.tsx` - Individual button component with RTL support
- `ContextMenu.tsx` - Main layout wrapper with language support
- `I18nProvider.tsx` - Translation context provider
- `App.tsx` - Application state, C# communication, and language management

### Adding New Buttons
1. Add the handler to `ContextMenu.tsx`
2. Add button text to translation files
3. Add the corresponding method to your C# host object
4. Update the interface in `App.tsx` if needed

## 🔧 Troubleshooting

### WebView2 Not Loading
- Ensure WebView2 runtime is installed
- Check file paths are absolute and correct
- Verify `dist/` folder structure is intact

### C# Communication Not Working
- Confirm host object is registered before loading the page
- Check that the C# class is marked with `[ComVisible(true)]`
- Verify method names match exactly between C# and TypeScript

### Build Issues
- Clear node_modules: `rm -rf node_modules && yarn install`
- Check Node.js version compatibility
- Ensure all dependencies are properly installed

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

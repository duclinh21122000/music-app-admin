# [App Skeleton]

Aoo-Skeleton based on React JS and Next JS Framework.

## ✨ Features 

- **Typescript**
- **React JS + Next JS 14**
- **TailwindCss + Headlessui**
- **Redux Toolkit, Redux Toolkit Query**
- **Testing**

## 🔨 Prerequisites

    git --version
    # 2.40.1
    node --version
    # v17.3.0
    yarn --version
    # 1.22.17

## 📦 Run scripts

Install packages:

    yarn

Start development:

    yarn dev

Run all test cases:

    yarn test

## 🖥 Code Structure

```shell
.
├── README.md                                           # README file
├── .husky                                              # Husky configuration
├── .vscode                                             # VSCode configuration
├── public                                              # Public assets folder
├── src
│   ├── app                                             # The app folder contains all the project's pages
│   │   ├─── login                                      # Login Page
│   │   │    ├─── layout.tsx     
│   │   │    ├─── page.tsx   
│   │   ├─── homepage                                   # Home Page
│   │   │    ├─── layout.tsx     
│   │   │    ├─── page.tsx   
│   ├── components                                      # Components
│   │   ├─── common                                     # Common components
│   │   │    ├─── Button         
│   │   │    ├─── Input          
│   │   │    ├─── ...         
│   │   ├─── layouts                                    # Layout components
│   │   │    ├─── Header     
│   │   │    ├─── Footer
│   │   │    ├─── ...        
│   ├── features                                        # Feature contain components related to the features of the application
│   │   ├─── authentication                             # Authentication feature
│   │   │    ├─── components                            # Auth Components
│   │   │    │    ├─── login                            # Login
│   │   │    │    │    ├─── Login.tsx                   # Auth Component
│   │   │    │    │    ├─── LoginContainer.tsx          # Auth Container connecting a React component to the Redux store
│   │   │    │    ├─── register                         # Login
│   │   │    │    │    ├─── Register.tsx                 
│   │   │    │    │    ├─── RegisterContainer.tsx       
│   │   │    ├─── authSlice.tsx                         # Auth Slice configuration
│   │   ├─── ...                                        # Other feature
│   ├── services                                        # Request API
│   │   ├─── api                                        # Api configuration
│   │   │    ├─── api.ts               
│   │   │    ├─── auth.ts               
│   │   │    ├─── ...                                   # Other Api configuration
│   │   ├─── models                                     # List API interfaces
│   │   │    ├─── IUser.ts              
│   │   │    ├─── ILoginRequest.ts      
│   │   │    ├─── ...                   
│   │   ├─── helpers                                    # Helper functions
│   ├── stores                                          # Redux store
│   │   ├─── button    
│   │   │    ├─── Button.stories.ts           
│   │   ├─── input    
│   │   │    ├─── Input.stories.ts       
│   │   ├─── ...    
│   ├── styles                                          # Global styles
│   ├── tests                                           # Test
│   ├── utils                                           # Utility functions, constants, config,...
├── .eslintrc.json              
├── .prettierrc.json
├── next.config.js                                      # NextJS configuration
├── postcss.config.js   
├── tailwind.config.js                                  # Tailwind configuration
└── tsconfig.json                                       # TypeScript configuration
```

## 🖥 Environment Support

- Modern browsers and Internet Explorer 11

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari |
| --- | --- | --- | --- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 📙 Technical Documents

- React Design Patterns and Best Practices: https://www.packtpub.com/product/react-design-patterns-and-best-practices/9781786464538
- Next JS: https://nextjs.org/docs
- Tailwind: https://tailwindcss.com/docs/installation
- JestJs - testing framework: https://jestjs.io/docs/getting-started
- @testing-library: https://testing-library.com/docs/

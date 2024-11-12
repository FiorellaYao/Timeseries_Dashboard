# Timeseries Dashboard

## How to run

From the Frontend I used React with Typescript and Vite to create the project.

### Steps

1. Have the app.py file already started to have the Websocket server connected and open
2. Open the terminal and clone the project
3. Call the remote branches with: `git fetch` and `git branch -r`
4. Create a local branch with the information from the remote with: 
   ```bash
   git checkout -b Front-end origin/Front-end 
5. Fetch all the information that the remote branch has with: 
   ```bash
   git pull origin Front-end
6. Open/Select the folder with the folders/files: `node_modules`, `public`, `src`, `.gitignore`, `config.ts`, `eslint.cnfig.js`, `index.html`, `package.json`, `package-lock.json`, `README.md`, `tsconfig.app.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`
7. Locate and open the folder inside Visual Studio Code to see all the files
8. Open a terminal in the folder and run the following command to be able to install all the dependencies found in the package.json: 
   ```bash
   npm install

9. After all the packages have been installed correctly, enter in the terminal:
   ```bash
   npm run dev

Show the local url to enter to view the project

## Notes

The project has 3 divisions: Home, Book and Plot, which can be seen in the navbar to navigate in each of them.

- **The first section 'Home'** has a background photo with a welcome sign and below the 4 assets are shown (WTI, SOY, YPF, SP500) that when moving the mouse over it shows their volatility percentage and return of each asset.

- **In the Book section** it shows the simulated prices of each asset, two independent search engines were added, one to search by the name of the asset and another to manage the number of days we want to simulate, affecting all assets. These selected days are sent to the Back via websocket so that the price simulation can be done in real time.

- **The last section Plot:** The WTI asset was chosen to graph its time series having price values ​​as the Y axis and the last timestamp as the X axis. In addition, points are observed in various measurements between Y and X, which appear as the number of days selected is updated and each point shows the value of the Last Price of WTI, these values ​​or points can be random since from the Backend we have the np.random.normal functionality.
# Timeseries Dashboard

## How to run

From the Backend I used Python to create the project.

### Steps

1. Open the terminal and clone the project
2. Call the remote branches with: `git fetch` and `git branch -r`
3. Create a local branch with the information from the remote with: 
   ```bash
   git checkout -b Back-end origin/Back-end 
4. Fetch all the information that the remote branch has with: 
   ```bash
   git pull origin Back-end
5. Open/Select the folder with the files: `app.py` and `README.md`.
6. Locate and open the `app.py` file.
7. Open a terminal in the folder and run the following command: 
   ```bash
   python app.py

8. And it will display the message `WebSocket server started at ws://localhost:8080`
And this is how the WebSocket server is started

## Notes

The process begins by creating the requested formula and requirements, creating a price simulation with Si (Initial Price) and Spread as main variables. With these two variables, the following data can be created: Bid, Last and Ask, each with its respective formula.

In other words, each asset (WTI, SOY, YPF, SP500) has the Bid, Last and Ask data with their simulated prices.

However, to obtain a certain range of how long to simulate the assets, the variable 'days' was added, whose value depends on what is entered in the Frontend. Otherwise, by default, it has 7 days to simulate each asset, counting from day 0.

It should be remembered that you have 252 business days to simulate prices of an asset.
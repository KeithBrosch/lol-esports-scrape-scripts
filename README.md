These are a set of web-scraping scripts that will be used by the Revere Application and Discord Bot.

Each supported eSport title has a script that will get a list of team objects and send them to our database for inserting/updating. These will run once every 24 hours on a cron.
Each supported eSport title also has a script that will get a list of upcoming matches, which will be used to send alerts to any user who is "subscribed" to either of the teams involved. These will run once every 10 minutes on a cron.

# ClaimCompanion
A little Claim Companion HTML/js/CSS app I hacked together.

The use case 
 - A claims Assessor will assess claims in differernt streams on a daily basis
 - Currently they do not have any way of monotoring their completed claims throughout the day
 - Each stream has a different weighting when completed
 - A claim can also be put on Hold (which doesn't get added to the total)
 - Uses LocalStorage so if closed, totals won't be lost

Note: I built this in a couple of hours so it's a bit hacky! This being said any critiques feel free to enlighten me! I kind of feel like refectoring for my own pease of mind!

# Known Bugs
 - The very first time it is opened it will set all values to empty string, will fix!

Intro to DynamoDB
-----------------

## Overview
In this lab, you will create a simple table in Amazon DynamoDB to store information about a music library, including the artist’s name, the song
and album titles, and the year of release. You will then query the music library and delete the table.

## Topics covered

- Creating an Amazon DynamoDB table
- Loading data into an Amazon DynamoDB Table
- Querying Amazon DynamoDB
- Deleting an Amazon DynamoDB table

## What is Amazon DynamoDB
Amazon DynamoDB is a fast and flexible NoSQL database service for all application that need consistent, single-digit millisecond latency at any scale.
It is fully managed database and supports both document and key-value data models. Its flexible data model and reliable performance make it a great fit for mobile, web, gaming, ad-tech, IoT
and many other applications.

## Creating a New Table
- Go to Services -> DynamoDB
- Create Table, set table name to Music
- Primary Key, type Artist and select String
- Click Add Sort Key and in the new field type SongTitle and leave String selected.
- In the Table Settings page, leave Use default settings selected and click Create.

## Adding and modifying data

In this procedure, you will add data to the Music table.

In DynamoDB, each Item is made up of Attributes. When you write an item to a DynamoDB table,
only the primary key attribute(s) are required. Other than the primary key, the table does not require a
schema. This means that you can add attributes to one item that may
be different than another item’s attributes.

- With the Music table selected, click the Items tab.
- Create Item
- For the Artist attribute, enter No One You Know in the VALUE field
- For the SongTitle attribute, enter Call me Today
- Add new attribute, AlbumTitle : Somewhat Famous
- Add new attribuet, Year : 2015
- After that, add 2 new items in the table 


## Modify an Existing Item in the Table

- Click tables
- Click radio button next to the Music table 
- Click items tab and select the year having a value of 2014
- Click the actions dropdown and select Edit
- For Year attribute value change 2014 to 2013
- Click Save

## Querying the Table

* Query using only the partition key.
* Query using both the partition key and the sort key
* Filter query results. Find songs by an artist and then return only
those songs that have more than three radio stations playing them.

- Click tables
- Select Music
- Click Items tab
- Click the drop-down labeled Scan [Table] Music: Artist, SongTitle and on the revealed panel,
use the dropdown to change Scan to Query

- For the first query, in the Partition Key... Artist... String = value box, type No One You Know.
- Start Search. All tracks by artist `No One You Know` are displayed

- Return to the Query panel by clicking the drop-down
- For a narrower query, in the Sort Key... SongTitle... String = value box, type Call Me Today
- Start Search


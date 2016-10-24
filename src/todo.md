* dynamic input count
	- start with one input
	- detect when not empty
	- add new empty input
	- render tags in own divs/spans
	- if empty remove input
* edit / delete datums
	- add ids to datums
	- button to edit datum
		- send datum state to add datum bar
		- send context to datum bar
			- if action is an edit, add datum bar button turns into an edit button (instead of an add button)
		- send new datum state back to old place
	- button to delete datum
		- action to remove datum, easy enough
* time input
	- add time to datum shape
	- add datum input to bar
	- show current time (or time of datum if set)
* table View
	- get fixed data table set up
* time View
* habit view (list view?)
* style with rems (find video again)
* name value pairs for tags
* auto-fill tag context menus
* export to csv/json
* hook up db (pouch db)
* arrays inside tags? (for structured data)

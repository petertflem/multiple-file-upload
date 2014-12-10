## Deprecated; please use this: https://github.com/petertflem/multiple-file-upload

# THIS DOCUMENTATION IS STILL INCOMPLETE

# MultipleFileUpload

An example multiple file upload implementation.
To see how it can be implemented, look in the examples folder.

## General information

### Initialization
When `multiple-file-upload.js` is run, it attaches it self to the `window` object as `window.MultipleFileUpload`. To create a new multiple file upload, you call the `create` function. You will need to pass in at least the required options.
These are __not__ the default options.

```javascript
MultipleFileUpload.create({
  containerId: 'multiple-pngs-upload-container',                        // required
  addNewRowButtonTemplateId: 'add-new-row-button-template',             // required
  rowTemplateId: 'file-upload-row',                                     // requried
  validExtensions: ['png'],                                             // optional
  rowDeleted: function() { console.log('Row deleted!'); },              // optional
  invalidFileType: function () { console.log('Invalid file type!'); },  // optional
  validFileType: function () { console.log('Valid file type!'); },      // optional
  inputFieldCleared: function () { console.log('Empty!'); },            // optional
  afterRowCreation: function () { console.log('Row created!'); }        // optional
});
```

### Templates
This modules use a very simple template system to define the markup of each row and the button to add more rows.
Below is an example of a template definition.
```html
<script id="my-template-id" type="text/template">
  ...
</script>
```
Inside the `script` tags you write markup as usual. The `type` attribute doesn't have to be `text/template`, it just have to be something else than what the browser recognize. The point is to avoid the browser parsing it. If the `type` attribute was set to `text/javascript`, the browser would try to parse it as JavaScript.

#### Setting the name attribute of the input field
When a row is added or deleted, the script parses the existing rows and sets the name attribute. It does this based on values provided in the `data-mapping` attribute on the input field.

The format is as follows:
```html
<input type="..." data-mapping="your-list-name" />
```
or
```html
<input type="..." data-mapping="your-list-name.your-property-name" />
```

__Only use '.' (dot) to seperate the list name from the property name. Do not use them as part of any other part of the name.__

Since this is made as a _multiple_ file upload, it always posts data from its rows as a list. This means the format of the name of the input field when it is posted will be either `your-list-name[0]` or `your-list-name[0].your-property-name`. The `0` will be incremented for each row the user has added in the html.

##### Examples
###### Name formats
This;
```html
<input type="file" data-mapping="images" />
```
will just be posted as `images[0]`.

This;
```html
<input type="file" data-mapping="images.file" />
```
will be posted with the name `images[0].file`. This is usefull if you want to take advantage of e.g. the object mapper in ASP.NET MVC, which will map the input to the list `images` and create an instance of the objects the list contains, put that in index 0, and fill the objects `file` property with the posted data.

###### With multiple rows
If there are multiple rows submitted; they will be submitted with the following names:
```text
your-list-name[0]
your-list-name[1]
your-list-name[2]
...
your-list-name[n]
```
or
```text
your-list-name[0].your-property-name
your-list-name[1].your-property-name
your-list-name[2].your-property-name
...
your-list-name[n].your-property-name
```

#### Example add-more-rows-button template and row template
##### Add-more button
```html
<!-- "add new"-button template -->
<script id="add-new-button-template" type="text/template">
  <a href="javascript:void(0)">Add new file input thing</a>
</script>
```
##### Row
```html
<!-- row containing the input field template -->
<script id="file-upload-row" type="text/template">
  <div>
    <div class="row">
      <div class="col-xs-7">
        <input type="file" title="Choose file" data-mapping="images.file" />
      </div>
      <div class="col-xs-3">
        <input type="text" placeholder="Enter a title here" data-mapping="images.title" />
      </div>
      <div class="col-xs-2 delete-link">
        <a href="javascript:void(0)">Delete</a>
      </div>
    </div>
  </div>
</script>
```

### Options
These are the default options, the options which are required will need parameters.
```javascript
{
  containerId: '',                    // required
  addNewRowButtonTemplateId: '',      // required
  rowTemplateId: '',                  // requried
  validExtensions: [],                // optional
  rowDeleted: function() {},          // optional
  invalidFileType: function () {},    // optional
  validFileType: function () {},      // optional
  inputFieldCleared: function () {},  // optional
  afterRowCreation: function () {}    // optional
}
```

#### validExtensions
_optional_

Valid file extensions, eg: `['png', 'txt', 'pdf']`.

#### containerId
_required_

The id of the element you want to put the uploader inside.

#### addNewRowButtonTemplateId
_required_

The id for the button which adds new rows.

#### rowTemplateId
_required_

The id for the template which contains the row markup.

#### rowDeleted
_optional_

Function called everytime a row is deleted.

#### invalidFileType
_optional_

Function called everytime an invalid file type is detected.

#### validFileType
_optional_

Function called everytime the user selects a valid file.

#### inputFieldCleared
_optional_

Function called when the user empties the `<input type="file" />` field, e.g. by selecting a new file. The the field
will be cleared, then populated again with the new file.

#### afterRowCreation
_optional_

Function called after a row is appended in the DOM, and before I attach my events to the row.

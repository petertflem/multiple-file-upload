# MultipleFileUpload

An example multiple file upload implementation in ASP.NET MVC 4.
To see how it can be implemented, look in the examples folder.

## General information

### Initialization
When `multiple-file-upload.js` is run, it attaches it self to the `window` object as `window.MultipleFileUpload`. To create a new multiple file upload, you call the `create` function.

````javascript
MultipleFileUpload.create();
```

You can also pass in options. The options are described below.

```javascript
MultipleFileUpload.create({ ... });
```

At the moment, the module doesn't have any default values. Some options are required. 

### Templates
This modules use a very simple template system to define the markup of each row and the button to add more rows.
Below is an example of a template definition.
```html
<script id="my-template-id" type="text/template">
  ...
</script>
```
Inside the `script` tags you write markup as usual. The `type` attribute doesn't have to be `text/template`, it just have to be something else than what the browser recognize. The point is to avoid the browser parsing it. If the `type` attribute was set to `text/javascript`, the browser would try to parse it as JavaScript.

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
        <input type="file" title="Choose file" />
      </div>
      <div class="col-xs-3">
        <input type="text" placeholder="Enter a title here" />
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
    validExtensions: [],              // optional
    containerId: '',                  // required
    addNewRowButtonTemplateId: '',    // required
    rowTemplateId: '',                // requried
    rowDeleted: function() {},        // optional
    invalidFileType: function () {},  // optional
    fileInputFieldName: '',           // required
    afterRowCreation: function () {}  // optional
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

Function called everytime an invalid file type is detected

#### fileInputFieldName
_required_

The name of the file input field. If set to `file` => `<input type="file" name="file" />`

#### afterRowCreation
_optional_

Function called after a row is appended in the DOM, and before I attach my events to the row

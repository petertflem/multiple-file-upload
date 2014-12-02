(function(_this) {

    var options = {};
    var defaultOptions = {
        validExtensions: [],
        containerId: '',
        addMoreButtonId: 'add-more-button',
        rowDeleted: function () { },
        invalidFileType: function () { }
    };
    
    function getNode(templateId) {
        var div = document.createElement('div');
        div.innerHTML = get(templateId).innerHTML;
        return div.children[0];
    }

    function addNewFileInput() {
        var row = getNode('file-upload-row');
        var container = get(options.containerId);

        row.className += ' file-upload-row';

        container.appendChild(row);
        attachNewListElementEventListeners(row);
    }
    
    function attachNewListElementEventListeners(row) {
        var _row = row;
        row.getElementsByTagName('a')[0].addEventListener('click', function () {
            _row.parentNode.removeChild(_row);
            mapFilesAndTitles();
            options.rowDeleted(); // callback on row deleted
        });

        // only css2 selectors in ie8
        row.querySelector('input[type="file"]').addEventListener('change', function () {
            var file = this.files[0];

            if (!file)
                return;

            mapFilesAndTitles();
            !isValidFileType(file.name) && options.invalidFileType(_row); // callback on invalid row
        });
    }
    
    function mapFilesAndTitles() {
        // We can't use the $.each index, because there might be 
        // empty input fields which we doesn't want to submit. We need
        // a cohesive series of numbers in the name field.
        var inputCounter = 0;
        var rows = get(options.containerId).querySelectorAll('.file-upload-row'); // only css2 selectors in ie8

        Array.prototype.slice.call(rows, 0).forEach(function (element) {
            var fileAndTitlePair = element.getElementsByTagName('input');
            var fileInput = fileAndTitlePair[0];
            var titleInput = fileAndTitlePair[1];

            if (!fileInput.files.length) {
                fileInput.removeAttribute('name');
                titleInput.removeAttribute('name');
            } else {
                fileInput.setAttribute('name', 'files[' + inputCounter + '].File');
                titleInput.setAttribute('name', 'files[' + inputCounter + '].Title');
                inputCounter++;
            }
        });
    }
    
    function isValidFileType(filename) {
        // If there are NO extensions, allow everything
        if (!options.validExtensions.length)
            return true;

        var extension = filename.substring(filename.lastIndexOf('.') + 1);
        if (!~options.validExtensions.indexOf(extension.toLowerCase()))
            return false;

        return true;
    }
    
    function addBaseMarkup() {
        var addNewRowButton = getNode('add-new-button-template');
        addNewRowButton.addEventListener('click', function() {
            addNewFileInput();
        });
        
        insertAfter(addNewRowButton, get(options.containerId));
    }

    _this.create = function(passedInOptions) {
        options = extend(defaultOptions, passedInOptions);

        addBaseMarkup();
        addNewFileInput();
        
        get(options.addMoreButtonId).addEventListener('click', function () {
            addNewFileInput();
        });
    };

    function extend(a, b) {
        for (var attrname in b)
            a[attrname] = b[attrname];
    
        return a;
    }
    
    function get(id) {
        return document.getElementById(id);
    }
    
    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

})(window.MultipleFileUpload = window.MultipleFileUpload || {});
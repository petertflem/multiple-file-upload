(function(_this) {
    _this.create = function(passedInOptions) {
        var defaultOptions = {
            validExtensions: [],
            containerId: '',
            addNewRowButtonTemplateId: '',
            rowTemplateId: '',
            rowDeleted: function() {},
            invalidFileType: function () {},
            afterRowCreation: function () {}
        };

        var options = extend(defaultOptions, passedInOptions);

        addBaseMarkup();
        addNewFileInput();

        function addNewFileInput() {
            var row = getNode(options.rowTemplateId);
            var container = get(options.containerId);

            row.className += ' file-upload-row';

            container.appendChild(row);
            options.afterRowCreation(row); // callback for after row creation. we attach our events after the callback, some other framework might mess with them.
            attachNewListElementEventListeners(row);
        }

        function attachNewListElementEventListeners(row) {
            row.getElementsByTagName('a')[0].addEventListener('click', function() {
                row.parentNode.removeChild(row);
                mapFilesAndTitles();
                options.rowDeleted(); // callback on row deleted
            });

            // only css2 selectors in ie8
            row.querySelector('input[type="file"]').addEventListener('change', function() {
                var file = this.files[0];

                if (!file)
                    return;

                mapFilesAndTitles();
                !isValidFileType(file.name) && options.invalidFileType(row); // callback on invalid row
            });
        }

        function mapFilesAndTitles() {
            // We can't use the Array.prototype.forEach index, because there might be 
            // empty input fields which we doesn't want to submit. We need
            // a cohesive series of numbers in the name field.
            var inputCounter = 0;
            var rows = get(options.containerId).querySelectorAll('.file-upload-row'); // only css2 selectors in ie8
            var rowsArray = Array.prototype.slice.call(rows, 0);
            
            for (var rowIndex = 0; rowIndex < rowsArray.length; rowIndex++) {
                var inputFields = rowsArray[rowIndex].getElementsByTagName('input');
                
                for (var i = 0; i < inputFields.length; i++) {
                    var input = inputFields[i];
                    var mapping = input.getAttribute('data-mapping').split('.');
                    var listName = mapping[0];
                    var propertyName = mapping[1];
                    
                    input.setAttribute('name', listName + '[' + inputCounter + '].' + propertyName);
                }

                inputCounter++;
            }
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
            var addNewRowButton = getNode(options.addNewRowButtonTemplateId);

            insertAfter(addNewRowButton, get(options.containerId));
            addNewRowButton.addEventListener('click', function() {
                addNewFileInput();
            });
        }
    };
    
    function getNode(templateId) {
        var div = document.createElement('div');
        div.innerHTML = get(templateId).innerHTML;
        return div.children[0];
    }

    function get(id) {
        return document.getElementById(id);
    }

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    
    function extend(a, b) {
        for (var attrname in b)
            a[attrname] = b[attrname];

        return a;
    }

})(window.MultipleFileUpload = window.MultipleFileUpload || {});
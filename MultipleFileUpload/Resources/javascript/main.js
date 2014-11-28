(function ($) {

    var validExtensions = ['txt', 'png', 'jpg'];        // All the valid file extensions
    var fileUploadInputs = $('#file-upload-inputs');    // List element containing all the li elements with the input fields
    var errorMessageDiv = $('#error-messages');         // The div that contains the error message
    
    bindDomElementEvents(); // Bind necessary dom element events
    addNewDocumentInput();  // Adds the initial first file upload li

    function bindDomElementEvents() {
        $('#add-more').on('click', function() {
            addNewDocumentInput();
        });

        $('#form').ajaxForm({
            url: '/Home/PostFiles',
            type: 'POST',
            beforeSerialize: handlePreSerialize,
            success: function (response) {
                $('#feedback').html('Submited: ' + response.submitedFiles);
            },
            error: function (response) {
                $('#feedback').html('Error: ' + response);
            }
        });
    }
    
    function isFormValid() {
        return !$('.row:first-child', fileUploadInputs.children()).is('.error-row');
    }
    
    function handlePreSerialize() {
        var files = hasFiles();
        var formValid = isFormValid();
        
        if (!files)
            $('#feedback').html('You have to add a file');

        if (!files || !formValid) return false;
        
        mapFilesAndTitles();
    }

    function addNewDocumentInput() {
        var li = getNewListElement();

        attachNewListElementEventListeners(li);
        fileUploadInputs.append(li);
    }

    function isValidFileType(filename) {
        // If there are NO extensions, allow everything
        if (!validExtensions.length)
            return true;

        var extension = filename.substring(filename.lastIndexOf('.') + 1);
        if (!~validExtensions.indexOf(extension.toLowerCase()))
            return false;

        return true;
    }

    function hasFiles() {
        // Check if any file input field contains a file
        return $('input[type="file"]', fileUploadInputs.children()).is(function() {
            return !!this.files.length;
        });
    }

    function createErrorMessageLabel() {
        return $('<label class="file-upload-error"></label>')
            .html('Invalid file type(s) was chosen');
    }

    function toggleErrorMessageForFileUpload() {
        if (isFormValid())
            errorMessageDiv.empty();
        else if (errorMessageDiv.children().length === 0)
            errorMessageDiv.append(createErrorMessageLabel());
    }

    function mapFilesAndTitles() {
        var listElements = $('li', fileUploadInputs);
        // We can't use the $.each index, because there might be 
        // empty input fields which we doesn't want to submit. We need
        // a cohesive series of numbers in the name field.
        var inputCounter = 0;
        
        $.each(listElements, function (i, li) {
            var fileAndTitlePair = li.getElementsByTagName('input');
            var fileInput = fileAndTitlePair[0];
            var titleInput = fileAndTitlePair[1];
            
            if (!fileInput.files.length) {
                $(fileInput).removeAttr('name');
                $(titleInput).removeAttr('name');
            } else {
                $(fileInput).prop('name', 'files[' + inputCounter + '].File');
                $(titleInput).prop('name', 'files[' + inputCounter + '].Title');
                inputCounter++;
            }
        });
    }
    
    function getNewListElement() {
        return $('<li>\
            <div class="row">\
                <div class="col-xs-7 name">\
                    <input type="file" class="relevantDocuments" title="Choose file" />\
                </div>\
                <div class="col-xs-3">\
                    <input type="text" placeholder="Enter a title here" />\
                </div>\
                <div class="col-xs-2 delete-link">\
                    <a href="javascript:void(0)">Delete</a>\
                </div>\
            </div>\
        </li>')[0];
    }

    function attachNewListElementEventListeners(li) {
        $('a', li).on('click', function () {
            $(this).closest('li').remove();
            toggleErrorMessageForFileUpload();
        });

        $('input[type="file"]', li).on('change', function () {
            var file = this.files[0];
            
            if (!file)
                return;

            var closestRow = $(this).closest('.row');
            isValidFileType(file.name)
                ? closestRow.removeClass('error-row')
                : closestRow.addClass('error-row');

            toggleErrorMessageForFileUpload();
        });
    }

})(jQuery);
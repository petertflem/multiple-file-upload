(function ($) {

    var errorMessageDiv = $('#error-messages');         // The div that contains the error message
    
    window.MultipleFileUpload.create({
        containerId: 'multiple-file-upload',
        addMoreButtonId: 'add-new-button-template',
        validExtensions: ['txt', 'png', 'jpg'],
        rowDeleted: function () {
            toggleErrorMessageForFileUpload();
        },
        invalidFileType: function (row) {
            $(row).addClass('error-row');
            toggleErrorMessageForFileUpload();
        }
    });
    
    bindDomElementEvents(); // Bind necessary dom element events

    function bindDomElementEvents() {
        $('#form').ajaxForm({
            url: '/Home/PostFiles',
            type: 'POST',
            success: function (response) {
                $('#feedback').html('Submited: ' + response.submitedFiles);
            },
            error: function (response) {
                $('#feedback').html('Error: ' + response);
            }
        });
    }
    
    function isAllFileUploadsValid() {
        return !$('#multiple-file-upload').children().hasClass('error-row');
    }

    function createErrorMessageLabel() {
        return $('<label class="file-upload-error"></label>')
            .html('Invalid file type(s) was chosen');
    }

    function toggleErrorMessageForFileUpload() {
        if (isAllFileUploadsValid())
            errorMessageDiv.empty();
        else if (errorMessageDiv.children().length === 0)
            errorMessageDiv.append(createErrorMessageLabel());
    }

})(jQuery);
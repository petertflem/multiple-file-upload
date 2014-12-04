(function ($) {

    var errorMessageDiv = $('#error-messages');     // The div that contains the error message
    var errorMessageDiv2 = $('#error-messages2');   // The div that contains the error message
    
    // Init image upload
    window.MultipleFileUpload.create({
        containerId: 'multiple-file-upload',
        addNewRowButtonTemplateId: 'add-new-button-template',
        rowTemplateId: 'file-upload-row',
        validExtensions: ['png', 'jpg'],
        fileInputFieldName: 'images',
        rowDeleted: function () {
            toggleErrorMessageForFileUpload(errorMessageDiv, 'multiple-file-upload');
        },
        invalidFileType: function (row) {
            $(row).addClass('error-row');
            toggleErrorMessageForFileUpload(errorMessageDiv, 'multiple-file-upload');
        }
    });
    
    // Init document upload
    window.MultipleFileUpload.create({
        containerId: 'multiple-file-upload2',
        addNewRowButtonTemplateId: 'add-new-button-template',
        rowTemplateId: 'file-upload-row',
        validExtensions: ['txt', 'doc', 'pdf'],
        fileInputFieldName: 'documents',
        rowDeleted: function () {
            toggleErrorMessageForFileUpload(errorMessageDiv2, 'multiple-file-upload2');
        },
        invalidFileType: function (row) {
            $(row).addClass('error-row');
            toggleErrorMessageForFileUpload(errorMessageDiv2, 'multiple-file-upload2');
        }
    });
    
    bindDomElementEvents(); // Bind necessary dom element events

    function bindDomElementEvents() {
        // Init ajax submission of form
        // If you don't want ajax submission, comment this out,
        // and in the view, comment in the form tag with the enctype, mothod, and action attributes set.
        $('#form').ajaxForm({
            url: '/Home/PostFiles',
            type: 'POST',
            beforeSerialize: function () {
                return isAllFileUploadsValid('multiple-file-upload') && isAllFileUploadsValid('multiple-file-upload2');
            },
            success: function (response) {
                $('#feedback').html('Submited: ' + response.submitedFiles);
            },
            error: function (response) {
                $('#feedback').html('Error: ' + response);
            }
        });
    }
    
    function isAllFileUploadsValid(containerId) {
        return !$('#' + containerId).children().hasClass('error-row');
    }

    function createErrorMessageLabel() {
        return $('<label class="file-upload-error"></label>')
            .html('Invalid file type(s) was chosen');
    }

    function toggleErrorMessageForFileUpload(errorMessageParentDiv, containerId) {
        if (isAllFileUploadsValid(containerId))
            errorMessageParentDiv.empty();
        else if (errorMessageParentDiv.children().length === 0)
            errorMessageParentDiv.append(createErrorMessageLabel());
    }

})(jQuery);
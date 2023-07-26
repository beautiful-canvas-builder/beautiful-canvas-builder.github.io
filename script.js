'use strict';

$(document).ready(function () {

    //⛔ Remove get started paragraph
    const removeGetStarted = function () {
        $('#get-started').remove();
    }

    const introVideo = function () {
        Swal.fire({
            title: 'Introduction to Beautiful Canvas Builder',
            html: '<div class="bsu-video"><iframe title="Welcome to the Beautiful Canvas Builder" width="450" height="300" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0" src="https://ballstate.mediasite.com/mediasite/Play/176e3727e1c843aabc7b907ecf8159bc1d" allowfullscreen msallowfullscreen allow="fullscreen"></iframe></div><p style="margin-bottom: 20px">For further learning, check out the videos below.</p><h3>Demo of All Items</h3><div class="bsu-video"><iframe title="Beautiful Canvas Builder - Demo of All Items" width="450" height="300" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0" src="https://ballstate.mediasite.com/mediasite/Play/b82b13041ba6442e817a8e340304eec01d" allowfullscreen msallowfullscreen allow="fullscreen"></iframe></div><h3>Walkthrough of Menu</h3><div class="bsu-video"><iframe title="Beautiful Canvas Builder - Menu Walkthrough" width="450" height="300" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0" src="https://ballstate.mediasite.com/mediasite/Play/48e5eb268388475798b9f241a9f333931d" allowfullscreen msallowfullscreen allow="fullscreen"></iframe></div><h3>Bonus Tips</h3><div class="bsu-video"><iframe title="Beautiful Canvas Builder - Bonus Tips" width="450" height="300" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0" src="https://ballstate.mediasite.com/mediasite/Play/5d0822d2e4cb485d9cb0ad953fd708bc1d" allowfullscreen msallowfullscreen allow="fullscreen"></iframe></div>',
            width: '800px',
            showConfirmButton: false,
            heightAuto: false
        })
    }
    $('.tour').click(introVideo);

    //💡 Helpful tips
    const helpfulTips = function () {
        Swal.fire({
            title: 'Tips for Using the Beautiful Canvas Builder',
            html: '<ul><li>The Beautiful Canvas Builder is designed to help you create the layout and design of your page, not edit content. You will need to edit content directly in Canvas.</li><li>All items in the Beautiful Canvas Builder are based on <a href="https://bsu.instructure.com/courses/123947">Beautiful Canvas Pages Made Easy</a>. You may continue to use Beautiful Canvas Pages Made Easy whenever you want.</li><li>If you have are not entirely sure about your page design, try adding placeholder text (by clicking the Text button) throughout your page. That will allow you the freedom once you are in Canvas to easily adjust content, including adding new content or moving it around.</li><li>Deleting an item or all items will ask you to confirm the deletion, so you don&rsquo;t accidentally delete something important.</li><li>Do not reload or close the browser tab while working on your design, as doing so will delete everything in the Builder.</li><li>We recommend using the latest version of the Google Chrome browser with a laptop or desktop. Your browser must have been updated at least within the last 5 years for this application to work properly.</li></ul>',
            icon: 'info',
            width: '800px',
            heightAuto: false,
            confirmButtonText: 'Back to the Builder',
            confirmButtonColor: '#BA0C2F',
            customClass: {
                htmlContainer: 'tips'
            }
        });
    };

    $('#tips').click(helpfulTips);

    //🔒 Accessibility & data privacy info
    const accessibilityInfo = function () {
        Swal.fire({
            title: 'Accessibility & Data Privacy Info',
            html: '<p style="text-align: left; font-weight: normal">The Beautiful Canvas Builder is designed to be accessible to users of assistive technologies such as screen readers. All design elements can be created and edited via keyboard. All images used include accessible alt text. As we continue to develop this tool, accessibility will be at the foreground of development.</p><p style="text-align: left; font-weight: normal">The only permissions this tool has is to copy text to your clipboard. The Beautiful Canvas Builder <em>cannot read</em> your clipboard text, so you do not need to worry that the tool can access text you have previously copied.</p>',
            icon: 'info',
            width: '800px',
            heightAuto: false,
            confirmButtonText: 'Back to the Builder',
            confirmButtonColor: '#BA0C2F',
            customClass: {
                htmlContainer: 'tips'
            }
        });
    };

    $('#accessibility').click(accessibilityInfo);

    //💡 Button tooltips 
    $('button').tooltip({
        position: {
            my: 'center top',
            at: 'bottom+10'
        },
        classes: {
            'ui-tooltip-content': 'bottom'
        }
    });

    //🗑️ Delete items
    const deleteItems = function (target) {
        $(target).fadeOut(('normal'), function () { $(target).remove(); });
    }

    const deleteConfirmation = Swal.mixin({
        title: 'Are you sure you want to delete?',
        icon: 'warning',
        iconColor: '#BA0C2F',
        text: 'Deleting items is permanent and cannot be undone.',
        showDenyButton: true,
        focusConfirm: false,
        confirmButtonColor: '#BA0C2F',
        confirmButtonText:
            '<i class="fa fa-trash-can"></i> Delete',
        denyButtonColor: '#E6E7E8',
        denyButtonText:
            '<span style="color: black"><i class="fa fa-rotate-left"></i> Back to Builder</span>',
        customClass: { container: 'delete-confirm' }
    });

    //🗑️ Delete all items
    const deleteAll = function () {
        deleteConfirmation.fire().then((result) => {
            if (result.isConfirmed) {
                deleteItems('.editor-element');
                deleteItems('.builder-element');
            }
        })
    };

    $('#delete').click(deleteAll);

    //🗑️ Delete individual item
    const deleteItem = function () {
        deleteConfirmation.fire().then((result) => {
            if (result.isConfirmed) {
                deleteItems($(this).closest('.editor-element'));
                deleteItems($(`[data-element=${$(this).closest('.editor-element').attr('id')}]`));
            }
        })
    }

    $('#editor').on('click', '.editor-menu .delete', deleteItem);

    //📋 Copy items to clipboard
    const clipboardCopy = function (target) {
        const copyContent = $(target).clone();
        copyContent.find('.editor-menu').remove();
        copyContent.find('.editor-element').children().unwrap();
        let clipboardHTML;
        if (target.is('#editor')) {
            copyContent.attr('class', 'bsu-page-width bsu-title-large bsu-page-typography').removeAttr('id');
            clipboardHTML = copyContent.prop('outerHTML');
        } else {
            console.log('copying one item');
            clipboardHTML = copyContent.html();
        }
        const blobInput = new Blob([clipboardHTML], { type: 'text/html' });
        const clipboardItemInput = new ClipboardItem({ 'text/html': blobInput });
        if ($('.editor-element').length > 0) {
            navigator.clipboard.write([clipboardItemInput]).then(() => {
                Swal.fire({
                    title: 'Successfully Copied to Clipboard',
                    text: 'Head over to your Canvas site and paste your content.',
                    icon: 'success',
                    confirmButtonText: 'Back to the Builder',
                    confirmButtonColor: '#BA0C2F'
                });
            }, () => {
                Swal.fire({
                    title: 'Failed to Copy to Clipboard',
                    text: 'Check your browser permissions and try again.',
                    icon: 'error',
                    iconColor: '#BA0C2F',
                    confirmButtonText: 'Back to the Builder',
                    confirmButtonColor: '#BA0C2F',
                    heightAuto: false
                });
            });
        } else {
            Swal.fire({
                title: 'Ope, There’s Nothing There to Copy',
                text: 'You may have been a bit overzealous there, friend. You’ll need to build some items before you can copy them.',
                icon: 'warning',
                iconColor: '#BA0C2F',
                confirmButtonText: 'Back to the Builder',
                confirmButtonColor: '#BA0C2F',
                heightAuto: false
            });
        };
    };

    $('#clipboard').click(function () {
        clipboardCopy($('#editor'));
    });
    $('#editor').on('click', '.editor-menu .clipboard', function () {
        clipboardCopy($(this).closest('.editor-element'));
    });

    //🛠️ Open and close builder settings
    $('#builder button').click(function () {
        $('#builder').removeClass('active');
    });

    $('#editor').on('click', '.delete', function () {
        $('#builder').removeClass('active');
    });

    $('#editor').on('click', '.editor-menu .settings', function () {
        $('#builder').toggleClass('active');
    });

    //📻 Update radio buttons
    $('#builder').on('change', 'input[type=radio]', function () {
        if ($(this).prop('checked')) {
            $(this).closest('.builder-field').find('label').removeClass('selected');
            $(this).prev('label').addClass('selected');
        }
        else {
            $(this).prev('label').removeClass('selected');
        }
    });

    //👉 Make editor element active
    const removeActive = function () {
        $('.editor-menu').remove();
        $('.active').blur();
        $('.active').removeClass('active');
        $('.builder-element').hide();
    }

    const makeElementActive = function (target) {
        const editorElement = $(target).closest('.editor-element');
        const builder = $(target).closest('#builder');
        const contentMenu = $(target).closest('#content-menu');
        const popup = $(target).closest('.swal2-popup');
        if (!editorElement.length && !builder.length && !contentMenu.length && !popup.length) {
            removeActive();
        } else if (editorElement.length > 0) {
            removeActive();
            const elementID = editorElement.attr('id');
            editorElement.addClass('active');
            $(`.builder-element[data-element="${elementID}"]`).show();
            addEditorMenu(editorElement);
            editorElement.focus();
        }
        //Initialize editor menu tooltips
        $('.editor-menu button').tooltip({
            position: {
                my: 'center top',
                at: 'bottom+10'
            },
            classes: {
                'ui-tooltip': 'ui-corner-all ui-widget-shadow',
                'ui-tooltip-content': 'bottom'
            }
        });
    }

    const addEditorMenu = function (target) {
        target.prepend(editorMenu);
        target.trigger('buttonStateChange');
    }

    $(document).on('click', function (event) {
        makeElementActive(event.target);
    });

    $('#editor').on('focus', '.editor-element', function (event) {
        if (event.target !== this) {
            return;
        }
        makeElementActive(event.target);
    });

    //⛔ Prevent default behavior on editor menu buttons
    $('#editor').on('click mousedown', '.editor-menu', function (event) {
        event.preventDefault();
        event.stopPropagation();
    });

    //📝 Editor variables
    const editorElementContainer = '<div class="editor-element" tabindex="0"></div>';
    const builderElementContainer = '<div class="builder-element"></div>';
    const editorMenu = '<div class="editor-menu"><button title="Design" class="settings"><i class="fa-solid fa-paintbrush"></i></button><button title="Copy to Clipboard" class="clipboard"><i class="fa-solid fa-clipboard"></i></button><button title="Duplicate" class="duplicate"><i class="fa-solid fa-copy"></i></button><button title="Move Up" class="move-up"><i class="fa-solid fa-up-long"></i></button><button title="Move Down" class="move-down"><i class="fa-solid fa-down-long"></i></button><button title="Delete" class="delete"><i class="fa-solid fa-trash-can"></i></button></div>';

    //📝 Create editor element
    const setElementType = function (target) {
        let elementType;
        if (target.attr('aria-describedby')) {
            elementType = $(`#${target.attr('aria-describedby')}`).children().text().split(' ').join('').toLowerCase().replace('(', '').replace(')', '').replace('/', '');
        }
        else {
            elementType = target.attr('title').split(' ').join('').toLowerCase().replace('(', '').replace(')', '').replace('/', '');
        }
        return elementType;
    }

    const createEditorElement = function (elementType) {
        removeGetStarted();
        removeActive();
        const newElement = $(editorElementContainer).uniqueId().addClass(`${elementType}`);
        const newElementId = newElement.attr('id');
        if ($('.bsu-column-row .empty').length > 0 && elementType !== 'columns') {
            const emptyColumn = $('.bsu-column-row').find('.empty').first();
            emptyColumn.empty();
            newElement.hide().appendTo(emptyColumn).fadeIn();
            emptyColumn.removeClass('empty');
        }
        else {
            newElement.hide().appendTo('#editor').fadeIn();
        }
        makeElementActive($(`#${newElementId}`));
        $(`#${newElementId}`).append(function () {
            let elementContent;
            switch (elementType) {
                case 'text':
                    elementContent = '<p>This is a simple paragraph of text with no settings. Use this wherever you want to insert text as a placeholder.</p>';
                    break;
                case 'sectionheading':
                    elementContent = '<h2 class="bsu-red-background">Section Heading Text</h2>';
                    break;
                case 'button':
                    elementContent = '<p><a href="https://www.bsu.edu/" class="bsu-button bsu-button-red">Button Text</a></p>';
                    break;
                case 'blockquote':
                    elementContent = '<figure class="bsu-quote-red-large"><blockquote><p>Blockquote text.</p></blockquote></figure>';
                    break;
                case 'unorderedbulletlist':
                    elementContent = '<ul class="bsu-carets"><li>List item</li><li>List item</li></ul>';
                    break;
                case 'orderednumberlist':
                    elementContent = '<ol class="bsu-list"><li>List item</li><li>List item</li></ol>';
                    break;
                case 'emphasisbox':
                    elementContent = '<div class="bsu-emphasis-large bsu-emphasis-red-icon"><div><h2><i class="fa-solid fa-lightbulb"></i>Emphasis Box Heading</h2></div><div><p>Contents of the emphasis box.</p></div></div>';
                    break;
                case 'tagpill':
                    elementContent = '<p class="bsu-tag-red">Tag Text</p>';
                    break;
                case 'dividerline':
                    elementContent = '<hr class="bsu-red-single">';
                    break;
                case 'responsivevideoembed':
                    elementContent = '<div class="bsu-video"><iframe width="560" height="315" src="https://www.youtube.com/embed/dfPAKnFCaJ4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
                    break;
                case 'image':
                    elementContent = '<div class="bsu-image-gray"><img src="https://bsu.instructure.com/courses/123947/files/12541375/preview" alt="Beneficence Statue on Ball State University Campus"></div>';
                    break;
                case 'accordion':
                    elementContent = '<div class="bsu-accordion"><details open><summary>Accordion Title</summary><div><p>Contents of the accordion.</p></div></details></div>';
                    break;
                case 'columns':
                    elementContent = '<div class="bsu-column-row"><div class="bsu-half empty"></div><div class="bsu-half empty"></div></div>';
                    break;
                case 'table':
                    elementContent = '<div class="bsu-responsive-table"><table class="bsu-stripe"><caption>Table Caption</caption><tbody><tr><th scope="col">Header Cell</th><th scope="col">Header Cell</th></tr><tr><td>Body cell</td><td>Body cell</td></tr></tbody></table>';
                    break;
                case 'progressbar':
                    elementContent = '<div class="bsu-progress" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"><div style="width: 50%; max-width: 100%;">50%</div></div>';
                    break;
            }
            return elementContent;
        });

        return {
            elementId: newElementId,
            elementType: elementType
        };
    }

    //⚙️ Create builder element
    const createBuilderElement = function (editorElement) {
        const elementId = editorElement.elementId;
        const elementType = editorElement.elementType;
        const newElement = $(builderElementContainer).addClass(`active ${elementType}`).attr('data-element', elementId);
        newElement.appendTo('#builder');
        const iconSelect = `<p style="margin-bottom: 20px">Insert the <a href="https://fontawesome.com/search?o=r&m=free" target="_blank">Font
        Awesome</a> code or select from one of the curated icons below.</p>
<input type="text" class="font-awesome" id="icon-code-${elementId}" placeholder="Insert Font Awesome code">
<div class="icon-group">
<h2>Education</h2>
<label class="radio-button selected" for="icon-lightbulb-${elementId}"><i
                class="fa-solid fa-lightbulb"></i></label>
<input type="radio" id="icon-lightbulb-${elementId}" name="icon-${elementId}" value="lightbulb" checked>

<label class="radio-button" for="icon-graduation-cap-${elementId}"><i
                class="fa-solid fa-graduation-cap"></i></label>
<input type="radio" id="icon-graduation-cap-${elementId}" name="icon-${elementId}" value="graduation-cap">

<label class="radio-button" for="icon-user-graduate-${elementId}"><i
                class="fa-solid fa-user-graduate"></i></label>
<input type="radio" id="icon-user-graduate-${elementId}" name="icon-${elementId}" value="user-graduate">

<label class="radio-button" for="icon-chalkboard-${elementId}"><i class="fa-solid fa-chalkboard"></i></label>
<input type="radio" id="icon-chalkboard-${elementId}" name="icon-${elementId}" value="chalkboard">

<label class="radio-button" for="icon-chalkboard-user-${elementId}"><i
                class="fa-solid fa-chalkboard-user"></i></label>
<input type="radio" id="icon-chalkboard-user-${elementId}" name="icon-${elementId}" value="chalkboard-user">

<label class="radio-button" for="icon-person-chalkboard-${elementId}"><i
                class="fa-solid fa-person-chalkboard"></i></label>
<input type="radio" id="icon-person-chalkboard-${elementId}" name="icon-${elementId}" value="person-chalkboard">

<label class="radio-button" for="icon-building-columns-${elementId}"><i
                class="fa-solid fa-building-columns"></i></label>
<input type="radio" id="icon-building-columns-${elementId}" name="icon-${elementId}" value="building-columns">

<label class="radio-button" for="icon-school-${elementId}"><i class="fa-solid fa-school"></i></label>
<input type="radio" id="icon-school-${elementId}" name="icon-${elementId}" value="school">

<label class="radio-button" for="icon-calendar-${elementId}"><i class="fa-solid fa-calendar"></i></label>
<input type="radio" id="icon-calendar-${elementId}" name="icon-${elementId}" value="calendar">

<label class="radio-button" for="icon-clock-${elementId}"><i class="fa-solid fa-clock"></i></label>
<input type="radio" id="icon-clock-${elementId}" name="icon-${elementId}" value="clock">
</div>
<div class="icon-group">
<h2>Communication</h2>
<label class="radio-button" for="icon-address-card-${elementId}"><i
                class="fa-solid fa-address-card"></i></label>
<input type="radio" id="icon-address-card-${elementId}" name="icon-${elementId}" value="address-card">

<label class="radio-button" for="icon-comment-${elementId}"><i class="fa-solid fa-comment"></i></label>
<input type="radio" id="icon-comment-${elementId}" name="icon-${elementId}" value="comment">

<label class="radio-button" for="icon-comments-${elementId}"><i class="fa-solid fa-comments"></i></label>
<input type="radio" id="icon-comments-${elementId}" name="icon-${elementId}" value="comments">

<label class="radio-button" for="icon-comment-dots-${elementId}"><i
                class="fa-solid fa-comment-dots"></i></label>
<input type="radio" id="icon-comment-dots-${elementId}" name="icon-${elementId}" value="comment-dots">

<label class="radio-button" for="icon-envelope-${elementId}"><i class="fa-solid fa-envelope"></i></label>
<input type="radio" id="icon-envelope-${elementId}" name="icon-${elementId}" value="envelope">

<label class="radio-button" for="icon-phone-${elementId}"><i class="fa-solid fa-phone"></i></label>
<input type="radio" id="icon-phone-${elementId}" name="icon-${elementId}" value="phone">

<label class="radio-button" for="icon-microphone-${elementId}"><i class="fa-solid fa-microphone"></i></label>
<input type="radio" id="icon-microphone-${elementId}" name="icon-${elementId}" value="microphone">

<label class="radio-button" for="icon-video-${elementId}"><i class="fa-solid fa-video"></i></label>
<input type="radio" id="icon-video-${elementId}" name="icon-${elementId}" value="video">

<label class="radio-button" for="icon-circle-play-${elementId}"><i class="fa-solid fa-circle-play"></i></label>
<input type="radio" id="icon-circle-play-${elementId}" name="icon-${elementId}" value="circle-play">

<label class="radio-button" for="icon-handshake-simple-${elementId}"><i
                class="fa-solid fa-handshake-simple"></i></label>
<input type="radio" id="icon-handshake-simple-${elementId}" name="icon-${elementId}" value="handshake-simple">
</div>
<div class="icon-group">
<h2>Reading, Writing, & Editing</h2>
<label class="radio-button" for="icon-pencil-${elementId}"><i class="fa-solid fa-pencil"></i></label>
<input type="radio" id="icon-pencil-${elementId}" name="icon-${elementId}" value="pencil">

<label class="radio-button" for="icon-pen-${elementId}"><i class="fa-solid fa-pen"></i></label>
<input type="radio" id="icon-pen-${elementId}" name="icon-${elementId}" value="pen">

<label class="radio-button" for="icon-pen-to-square-${elementId}"><i
                class="fa-solid fa-pen-to-square"></i></label>
<input type="radio" id="icon-pen-to-square-${elementId}" name="icon-${elementId}" value="pen-to-square">

<label class="radio-button" for="icon-pen-ruler-${elementId}"><i class="fa-solid fa-pen-ruler"></i></label>
<input type="radio" id="icon-pen-ruler-${elementId}" name="icon-${elementId}" value="pen-ruler">

<label class="radio-button" for="icon-highlighter-${elementId}"><i class="fa-solid fa-highlighter"></i></label>
<input type="radio" id="icon-highlighter-${elementId}" name="icon-${elementId}" value="highlighter">

<label class="radio-button" for="icon-paperclip-${elementId}"><i class="fa-solid fa-paperclip"></i></label>
<input type="radio" id="icon-paperclip-${elementId}" name="icon-${elementId}" value="paperclip">

<label class="radio-button" for="icon-paragraph-${elementId}"><i class="fa-solid fa-paragraph"></i></label>
<input type="radio" id="icon-paragraph-${elementId}" name="icon-${elementId}" value="paragraph">

<label class="radio-button" for="icon-list-${elementId}"><i class="fa-solid fa-list"></i></label>
<input type="radio" id="icon-list-${elementId}" name="icon-${elementId}" value="list">

<label class="radio-button" for="icon-link-${elementId}"><i class="fa-solid fa-link"></i></label>
<input type="radio" id="icon-link-${elementId}" name="icon-${elementId}" value="link">

<label class="radio-button" for="icon-quote-left-${elementId}"><i class="fa-solid fa-quote-left"></i></label>
<input type="radio" id="icon-quote-left-${elementId}" name="icon-${elementId}" value="quote-left">

<label class="radio-button" for="icon-quote-right-${elementId}"><i class="fa-solid fa-quote-right"></i></label>
<input type="radio" id="icon-quote-right-${elementId}" name="icon-${elementId}" value="quote-right">

<label class="radio-button" for="icon-scissors-${elementId}"><i class="fa-solid fa-scissors"></i></label>
<input type="radio" id="icon-scissors-${elementId}" name="icon-${elementId}" value="scissors">

<label class="radio-button" for="icon-copy-${elementId}"><i class="fa-solid fa-copy"></i></label>
<input type="radio" id="icon-copy-${elementId}" name="icon-${elementId}" value="copy">

<label class="radio-button" for="icon-paste-${elementId}"><i class="fa-solid fa-paste"></i></label>
<input type="radio" id="icon-paste-${elementId}" name="icon-${elementId}" value="paste">

<label class="radio-button" for="icon-repeat-${elementId}"><i class="fa-solid fa-repeat"></i></label>
<input type="radio" id="icon-repeat-${elementId}" name="icon-${elementId}" value="repeat">

<label class="radio-button" for="icon-book-${elementId}"><i class="fa-solid fa-book"></i></label>
<input type="radio" id="icon-book-${elementId}" name="icon-${elementId}" value="book">

<label class="radio-button" for="icon-book-open-${elementId}"><i class="fa-solid fa-book-open"></i></label>
<input type="radio" id="icon-book-open-${elementId}" name="icon-${elementId}" value="book-open">

<label class="radio-button" for="icon-book-open-reader-${elementId}"><i
                class="fa-solid fa-book-open-reader"></i></label>
<input type="radio" id="icon-book-open-reader-${elementId}" name="icon-${elementId}" value="book-open-reader">

<label class="radio-button" for="icon-bookmark-${elementId}"><i class="fa-solid fa-bookmark"></i></label>
<input type="radio" id="icon-bookmark-${elementId}" name="icon-${elementId}" value="bookmark">
</div>
<div class="icon-group">
<h2>Devices & Technology</h2>
<label class="radio-button" for="icon-computer-${elementId}"><i class="fa-solid fa-computer"></i></label>
<input type="radio" id="icon-computer-${elementId}" name="icon-${elementId}" value="computer">

<label class="radio-button" for="icon-display-${elementId}"><i class="fa-solid fa-display"></i></label>
<input type="radio" id="icon-display-${elementId}" name="icon-${elementId}" value="display">

<label class="radio-button" for="icon-laptop-${elementId}"><i class="fa-solid fa-laptop"></i></label>
<input type="radio" id="icon-laptop-${elementId}" name="icon-${elementId}" value="laptop">

<label class="radio-button" for="icon-mobile-${elementId}"><i class="fa-solid fa-mobile"></i></label>
<input type="radio" id="icon-mobile-${elementId}" name="icon-${elementId}" value="mobile">

<label class="radio-button" for="icon-power-off-${elementId}"><i class="fa-solid fa-power-off"></i></label>
<input type="radio" id="icon-power-off-${elementId}" name="icon-${elementId}" value="power-off">

<label class="radio-button" for="icon-print-${elementId}"><i class="fa-solid fa-print"></i></label>
<input type="radio" id="icon-print-${elementId}" name="icon-${elementId}" value="print">

<label class="radio-button" for="icon-screwdriver-wrench-${elementId}"><i
                class="fa-solid fa-screwdriver-wrench"></i></label>
<input type="radio" id="icon-screwdriver-wrench-${elementId}" name="icon-${elementId}"
        value="screwdriver-wrench">

<label class="radio-button" for="icon-gear-${elementId}"><i class="fa-solid fa-gear"></i></label>
<input type="radio" id="icon-gear-${elementId}" name="icon-${elementId}" value="gear">
</div>
<div class="icon-group">
<h2>Users & People</h2>
<label class="radio-button" for="icon-user-${elementId}"><i class="fa-solid fa-user"></i></label>
<input type="radio" id="icon-user-${elementId}" name="icon-${elementId}" value="user">

<label class="radio-button" for="icon-circle-user-${elementId}"><i class="fa-solid fa-circle-user"></i></label>
<input type="radio" id="icon-circle-user-${elementId}" name="icon-${elementId}" value="circle-user">

<label class="radio-button" for="icon-users-${elementId}"><i class="fa-solid fa-users"></i></label>
<input type="radio" id="icon-users-${elementId}" name="icon-${elementId}" value="users">

<label class="radio-button" for="icon-user-group-${elementId}"><i class="fa-solid fa-user-group"></i></label>
<input type="radio" id="icon-user-group-${elementId}" name="icon-${elementId}" value="user-group">

<label class="radio-button" for="icon-people-group-${elementId}"><i
                class="fa-solid fa-people-group"></i></label>
<input type="radio" id="icon-people-group-${elementId}" name="icon-${elementId}" value="people-group">

<label class="radio-button" for="icon-people-line-${elementId}"><i class="fa-solid fa-people-line"></i></label>
<input type="radio" id="icon-people-line-${elementId}" name="icon-${elementId}" value="people-line">

<label class="radio-button" for="icon-people-arrows-${elementId}"><i
                class="fa-solid fa-people-arrows"></i></label>
<input type="radio" id="icon-people-arrows-${elementId}" name="icon-${elementId}" value="people-arrows">

<label class="radio-button" for="icon-arrows-down-to-people-${elementId}"><i
                class="fa-solid fa-arrows-down-to-people"></i></label>
<input type="radio" id="icon-arrows-down-to-people-${elementId}" name="icon-${elementId}"
        value="arrows-down-to-people">

<label class="radio-button" for="icon-person-digging-${elementId}"><i
                class="fa-solid fa-person-digging"></i></label>
<input type="radio" id="icon-person-digging-${elementId}" name="icon-${elementId}" value="person-digging">
</div>
<div class="icon-group">
<h2>Files</h2>
<label class="radio-button" for="icon-file-${elementId}"><i class="fa-solid fa-file"></i></label>
<input type="radio" id="icon-file-${elementId}" name="icon-${elementId}" value="file">

<label class="radio-button" for="icon-file-arrow-down-${elementId}"><i
                class="fa-solid fa-file-arrow-down"></i></label>
<input type="radio" id="icon-file-arrow-down-${elementId}" name="icon-${elementId}" value="file-arrow-down">

<label class="radio-button" for="icon-file-arrow-up-${elementId}"><i
                class="fa-solid fa-file-arrow-up"></i></label>
<input type="radio" id="icon-file-arrow-up-${elementId}" name="icon-${elementId}" value="file-arrow-up">

<label class="radio-button" for="icon-file-circle-check-${elementId}"><i
                class="fa-solid fa-file-circle-check"></i></label>
<input type="radio" id="icon-file-circle-check-${elementId}" name="icon-${elementId}" value="file-circle-check">

<label class="radio-button" for="icon-file-circle-xmark-${elementId}"><i
                class="fa-solid fa-file-circle-xmark"></i></label>
<input type="radio" id="icon-file-circle-xmark-${elementId}" name="icon-${elementId}" value="file-circle-xmark">

<label class="radio-button" for="icon-file-circle-exclamation-${elementId}"><i
                class="fa-solid fa-file-circle-exclamation"></i></label>
<input type="radio" id="icon-file-circle-exclamation-${elementId}" name="icon-${elementId}"
        value="file-circle-exclamation">

<label class="radio-button" for="icon-file-lines-${elementId}"><i class="fa-solid fa-file-lines"></i></label>
<input type="radio" id="icon-file-lines-${elementId}" name="icon-${elementId}" value="file-lines">

<label class="radio-button" for="icon-file-invoice-${elementId}"><i
                class="fa-solid fa-file-invoice"></i></label>
<input type="radio" id="icon-file-invoice-${elementId}" name="icon-${elementId}" value="file-invoice">

<label class="radio-button" for="icon-file-pen-${elementId}"><i class="fa-solid fa-file-pen"></i></label>
<input type="radio" id="icon-file-pen-${elementId}" name="icon-${elementId}" value="file-pen">

<label class="radio-button" for="icon-clipboard-${elementId}"><i class="fa-solid fa-clipboard"></i></label>
<input type="radio" id="icon-clipboard-${elementId}" name="icon-${elementId}" value="clipboard">

<label class="radio-button" for="icon-clipboard-list-${elementId}"><i
                class="fa-solid fa-clipboard-list"></i></label>
<input type="radio" id="icon-clipboard-list-${elementId}" name="icon-${elementId}" value="clipboard-list">

<label class="radio-button" for="icon-clipboard-check-${elementId}"><i
                class="fa-solid fa-clipboard-check"></i></label>
<input type="radio" id="icon-clipboard-check-${elementId}" name="icon-${elementId}" value="clipboard-check">

<label class="radio-button" for="icon-folder-${elementId}"><i class="fa-solid fa-folder"></i></label>
<input type="radio" id="icon-folder-${elementId}" name="icon-${elementId}" value="folder">

<label class="radio-button" for="icon-folder-open-${elementId}"><i class="fa-solid fa-folder-open"></i></label>
<input type="radio" id="icon-folder-open-${elementId}" name="icon-${elementId}" value="folder-open">
</div>
<div class="icon-group">
<h2>Location</h2>
<label class="radio-button" for="icon-house-chimney-${elementId}"><i
                class="fa-solid fa-house-chimney"></i></label>
<input type="radio" id="icon-house-chimney-${elementId}" name="icon-${elementId}" value="house-chimney">

<label class="radio-button" for="icon-bullseye-${elementId}"><i class="fa-solid fa-bullseye"></i></label>
<input type="radio" id="icon-bullseye-${elementId}" name="icon-${elementId}" value="bullseye">

<label class="radio-button" for="icon-location-crosshairs-${elementId}"><i
                class="fa-solid fa-location-crosshairs"></i></label>
<input type="radio" id="icon-location-crosshairs-${elementId}" name="icon-${elementId}"
        value="location-crosshairs">

<label class="radio-button" for="icon-signs-post-${elementId}"><i class="fa-solid fa-signs-post"></i></label>
<input type="radio" id="icon-signs-post-${elementId}" name="icon-${elementId}" value="signs-post">

<label class="radio-button" for="icon-map-${elementId}"><i class="fa-solid fa-map"></i></label>
<input type="radio" id="icon-map-${elementId}" name="icon-${elementId}" value="map">

<label class="radio-button" for="icon-map-location-dot-${elementId}"><i
                class="fa-solid fa-map-location-dot"></i></label>
<input type="radio" id="icon-map-location-dot-${elementId}" name="icon-${elementId}" value="map-location-dot">

<label class="radio-button" for="icon-map-pin-${elementId}"><i class="fa-solid fa-map-pin"></i></label>
<input type="radio" id="icon-map-pin-${elementId}" name="icon-${elementId}" value="map-pin">

<label class="radio-button" for="icon-location-dot-${elementId}"><i
                class="fa-solid fa-location-dot"></i></label>
<input type="radio" id="icon-location-dot-${elementId}" name="icon-${elementId}" value="location-dot">

<label class="radio-button" for="icon-thumbtack-${elementId}"><i class="fa-solid fa-thumbtack"></i></label>
<input type="radio" id="icon-thumbtack-${elementId}" name="icon-${elementId}" value="thumbtack">

<label class="radio-button" for="icon-sitemap-${elementId}"><i class="fa-solid fa-sitemap"></i></label>
<input type="radio" id="icon-sitemap-${elementId}" name="icon-${elementId}" value="sitemap">
</div>
<div class="icon-group">
<h2>Alerts & Emphasis</h2>
<label class="radio-button" for="icon-star-${elementId}"><i class="fa-solid fa-star"></i></label>
<input type="radio" id="icon-star-${elementId}" name="icon-${elementId}" value="star">

<label class="radio-button" for="icon-flag-${elementId}"><i class="fa-solid fa-flag"></i></label>
<input type="radio" id="icon-flag-${elementId}" name="icon-${elementId}" value="flag">

<label class="radio-button" for="icon-bullhorn-${elementId}"><i class="fa-solid fa-bullhorn"></i></label>
<input type="radio" id="icon-bullhorn-${elementId}" name="icon-${elementId}" value="bullhorn">

<label class="radio-button" for="icon-bell-${elementId}"><i class="fa-solid fa-bell"></i></label>
<input type="radio" id="icon-bell-${elementId}" name="icon-${elementId}" value="bell">

<label class="radio-button" for="icon-check-${elementId}"><i class="fa-solid fa-check"></i></label>
<input type="radio" id="icon-check-${elementId}" name="icon-${elementId}" value="check">

<label class="radio-button" for="icon-exclamation-${elementId}"><i class="fa-solid fa-exclamation"></i></label>
<input type="radio" id="icon-exclamation-${elementId}" name="icon-${elementId}" value="exclamation">

<label class="radio-button" for="icon-circle-exclamation-${elementId}"><i
                class="fa-solid fa-circle-exclamation"></i></label>
<input type="radio" id="icon-circle-exclamation-${elementId}" name="icon-${elementId}"
        value="circle-exclamation">

<label class="radio-button" for="icon-triangle-exclamation-${elementId}"><i
                class="fa-solid fa-triangle-exclamation"></i></label>
<input type="radio" id="icon-triangle-exclamation-${elementId}" name="icon-${elementId}"
        value="triangle-exclamation">

<label class="radio-button" for="icon-question-${elementId}"><i class="fa-solid fa-question"></i></label>
<input type="radio" id="icon-question-${elementId}" name="icon-${elementId}" value="question">

<label class="radio-button" for="icon-circle-question-${elementId}"><i
                class="fa-solid fa-circle-question"></i></label>
<input type="radio" id="icon-circle-question-${elementId}" name="icon-${elementId}" value="circle-question">

<label class="radio-button" for="icon-circle-info-${elementId}"><i class="fa-solid fa-circle-info"></i></label>
<input type="radio" id="icon-circle-info-${elementId}" name="icon-${elementId}" value="circle-info">
</div>`;
        $(`[data-element=${elementId}]`).append(function () {
            let elementContent;
            switch (elementType) {
                case 'text':
                    elementContent = '<p>There are no settings for this item.</p>';
                    break;
                case 'sectionheading':
                    elementContent = `<div class="builder-field heading-style dropdown">
                            <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Choose from one of 6 styles for headings. Some styles include an icon and others do not."></a>Heading Style</p>
                            <select>
                            <option value="red-background">Red Background</option>
                            <option value="red-bar">Red Bar</option>
                            <option value="gray-background">Gray Background</option>
                            <option value="gray-bar">Gray Bar</option>
                            <option value="black-icon">Black Icon</option>
                            <option value="red-icon">Red Icon</option>
                            </select>
                            </div>
                            <div class="builder-field heading-level radio">
                            <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Use a level 2 heading for your main section headings. Use a level 3 heading for your sub-sections."></a>Heading Level</p>
                        <label class="radio-button selected" for="heading-level-2-${elementId}">Level 2</label>
                        <input type="radio" id="heading-level-2-${elementId}" name="heading-level-${elementId}" value="level-2" checked>
                        <label class="radio-button" for="heading-level-3-${elementId}">Level 3</label>
                        <input type="radio" id="heading-level-3-${elementId}" name="heading-level-${elementId}" value="level-3"></div>
                        <div class="builder-field icon icon-selection radio" style="display: none">
                        <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Choose any of the following preset icons to display with your heading."></a>Choose an Icon</p>
                        ${iconSelect}
                        </div>
                        <div class="instructions">
                        <h2>Note</h2>
                        <p>Read more about <a href="https://bsu.instructure.com/courses/123947/pages/section-headings" target="_blank">Section Heading styles in Beautiful Canvas Pages Made Easy</a>.</p>
                        </div>`;
                    break;
                case 'button':
                    elementContent = `<div class="builder-field button-style dropdown">
                            <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Choose from one of 5 styles for headings. All styles can include an icon if you want."></a>Button Style</p>
                            <select>
                            <option value="red">Red Button</option>
                            <option value="white">White Button</option>
                            <option value="gray">Gray Button</option>
                            <option value="red-animated">Red Button Animated</option>
                            <option value="text">Text Link Animated</option>
                            </select>
                            </div>
                            <div class="builder-field button-link text">
                            <p class="question-text">
                            <a class="tooltip" href="javascript:void(0)" data-tooltip="Copy and paste any web address (URL). For internal Canvas links, you can copy the URL from your browser address bar."></a>Button Link</p>
                            <input type="text" id="button-link-${elementId}" placeholder="Paste URL here">
                            </div>
                            <div class="builder-field button-new-tab toggle">
                            <p class="question-text">
                            <a class="tooltip" href="javascript:void(0)" data-tooltip="Use this for external links, such as to an article on the web. Do not use this for Canvas links."></a>Open in a New Tab</p>
                            <label class="toggle" for="button-new-tab-${elementId}">
                                <input type="checkbox" id="button-new-tab-${elementId}" value="yes">
                                <span class="toggle"></span>
                            </label>
                        </div>
                        <div class="builder-field button-shadow toggle">
                            <p class="question-text">
                            <a class="tooltip" href="javascript:void(0)" data-tooltip="A shadow can help give a button some visual depth. Can be used on all styles except the animated buttons."></a>Button Shadow</p>
                            <label class="toggle" for="button-shadow-${elementId}">
                                <input type="checkbox" id="button-shadow-${elementId}" value="yes">
                                <span class="toggle"></span>
                            </label>
                        </div>
                        <div class="builder-field button-icon toggle">
                            <p class="question-text">
                            <a class="tooltip" href="javascript:void(0)" data-tooltip="An icon can help you add visual meaning to a button. Icons always display to the left of the button text."></a>Button Icon</p>
                            <label class="toggle" for="button-icon-${elementId}">
                                <input type="checkbox" id="button-icon-${elementId}" value="yes">
                                <span class="toggle"></span>
                            </label>
                        </div>
                        <div class="builder-field button-icon-selection icon-selection radio" style="display: none">
                        <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Choose any of the following preset icons to display with your button."></a>Choose an Icon</p>
                        ${iconSelect}
                        </div>
                        <div class="instructions">
                        <h2>Note</h2>
                        <p>Read more about <a href="https://bsu.instructure.com/courses/123947/pages/buttons" target="_blank">Button styles in Beautiful Canvas Pages Made Easy</a>.</p>
                        </div>`;
                    break;
                case 'blockquote':
                    elementContent = `<div class="builder-field quote-style dropdown">
                            <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Choose from one of 3 styles for block quotes. All styles can include an attribution."></a>Quote Style</p>
                            <select>
                            <option value="red-large">Red Large</option>
                            <option value="gray-large">Gray Large</option>
                            <option value="gray-small">Gray Small</option>
                            </select>
                            </div><div class="builder-field quote-attribution toggle">
                            <p class="question-text">
                            <a class="tooltip" href="javascript:void(0)" data-tooltip="A smaller line of
                            text at the bottom of the quote for
                            you to attribute the source. If you prefer, you may instead provide attribution elsewhere, such
                            as the
                            surrounding text."></a>Quote Attribution</p>
                            <label class="toggle" for="quote-attribution-${elementId}">
                                <input type="checkbox" id="quote-attribution-${elementId}" value="yes">
                                <span class="toggle"></span>
                            </label>
                        </div>
                        <div class="instructions">
                        <h2>Note</h2>
                        <p>Read more about <a href="https://bsu.instructure.com/courses/123947/pages/block-and-pull-quotes" target="_blank">Blockquote styles in Beautiful Canvas Pages Made Easy</a>.</p>
                        </div>`;
                    break;
                case 'unorderedbulletlist':
                    elementContent = `<div class="builder-field list-style radio">
                            <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Use  checks for lists that involve completing something, such as a task list or assignment requirements. Use carets for lists that do not."></a>List Markers</p>
                        <label class="radio-button selected" for="ul-style-carets-${elementId}"><i class="fa-solid fa-caret-right"></i> Carets</label>
                        <input type="radio" id="ul-style-carets-${elementId}" name="ul-style-${elementId}" value="carets" checked>
                        <label class="radio-button" for="ul-style-check-${elementId}"><i class="fa-solid fa-check-square"></i> Checks</label>
                        <input type="radio" id="ul-style-check-${elementId}" name="ul-style-${elementId}" value="checks"></div>
                        <div class="instructions">
                        <h2>Note</h2>
                        <p>Read more about <a href="https://bsu.instructure.com/courses/123947/pages/lists" target="_blank">List styles in Beautiful Canvas Pages Made Easy</a>.</p>
                        </div>`;
                    break;
                case 'orderednumberlist':
                    elementContent = `<div class="builder-field list-style radio">
                            <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Use circles for most lists. Use timeline for lists where you want to highlight the sequence of the list, such as tasks to complete in order."></a>List Markers</p>
                        <label class="radio-button selected" for="ol-style-circle-${elementId}"><i class="fa-solid fa-circle"></i> Circles</label>
                        <input type="radio" id="ol-style-circle-${elementId}" name="ol-style-${elementId}" value="circle" checked>
                        <label class="radio-button" for="ol-style-timeline-${elementId}"><i class="fa-solid fa-timeline"></i> Timeline</label>
                        <input type="radio" id="ol-style-timeline-${elementId}" name="ol-style-${elementId}" value="timeline"></div>
                        <div class="instructions">
                        <h2>Note</h2>
                        <p>Read more about <a href="https://bsu.instructure.com/courses/123947/pages/lists" target="_blank">List styles in Beautiful Canvas Pages Made Easy</a>.</p>
                        </div>`;
                    break;
                case 'emphasisbox':
                    elementContent = `<div class="builder-field emphasis-style dropdown">
                            <label class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Choose from one of 8 styles for emphasis boxes. Some styles include an icon and others do not."></a>Emphasis Box Style</label>
                            <select>
                            <option value="red-icon">Red Icon (Large)</option>
                            <option value="gray-icon">Gray Icon (Large)</option>
                            <option value="red-large">Red (Large)</option>
                            <option value="black">Black (Large)</option>
                            <option value="red-small">Red (Small)</option>
                            <option value="gray">Gray (Small)</option>
                            <option value="red-outline">Red Outline (Small)</option>
                            <option value="gray-outline">Gray Outline (Small)</option>
                            </select>
                            </div>
                        <div class="builder-field icon icon-selection radio">
                        <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Choose any of the following preset icons to display with your emphasis box."></a>Choose an Icon</p>
                        ${iconSelect}
                        </div>
                        <div class="instructions">
                        <h2>Note</h2>
                        <p>Read more about <a href="https://bsu.instructure.com/courses/123947/pages/emphasis-boxes" target="_blank">Emphasis Box styles in Beautiful Canvas Pages Made Easy</a>.</p>
                        </div>`;
                    break;
                case 'tagpill':
                    elementContent = `<div class="builder-field tag-style dropdown">
                            <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Choose from one of 4 styles for tags/pills."></a>Tag/Pill Style</p>
                            <select>
                            <option value="red">Red Tag</option>
                            <option value="gray">Gray Tag</option>
                            <option value="stripe">Stripe Tag</option>
                            <option value="pill">Pill</option>
                            </select>
                            </div>
                            <div class="instructions">
                            <h2>Note</h2>
                            <p>Read more about <a href="https://bsu.instructure.com/courses/123947/pages/tags-and-pills" target="_blank">Tag and Pill styles in Beautiful Canvas Pages Made Easy</a>.</p>
                            </div>`;
                    break;
                case 'dividerline':
                    elementContent = `<div class="builder-field divider-style dropdown">
                                <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Choose from one of 6 styles for divider lines."></a>Divider Line Style</p>
                                <select>
                                <option value="red-single">Red Single</option>
                                <option value="red-double">Red Double</option>
                                <option value="red-arrows">Red Arrows</option>
                                <option value="gray-single">Gray Single</option>
                                <option value="gray-double">Gray Double</option>
                                <option value="gray-arrows">Gray Arrows</option>
                                </select>
                                </div>
                                <div class="instructions">
                                <h2>Note</h2>
                                <p>Read more about <a href="https://bsu.instructure.com/courses/123947/pages/divider-lines" target="_blank">Divider Line styles in Beautiful Canvas Pages Made Easy</a>.</p>
                                </div>`;
                    break;
                case 'responsivevideoembed':
                    elementContent = `<div class="builder-field video-service dropdown">
                                <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Choose which video service you want to embed a video from."></a>Video Service</p>
                                <select>
                                <option value="mediasite">Mediasite</option>
                                <option value="youtube">YouTube</option>
                                <option value="vimeo">Vimeo</option>
                                </select>
                                </div>
                                <div class="builder-field video-link text">
                                <p class="question-text">
                                <a class="tooltip" href="javascript:void(0)" data-tooltip="Instructions for the selected video service are below."></a>Video Link</p>
                                <input type="text" id="video-link-${elementId}" placeholder="Paste video URL here">
                                <div class="instructions mediasite">
                                <h2>Mediasite</h2>
                                <ol class="bsu-list">
                                <li><a href="https://ballstate.mediasite.com/Mediasite/mymediasite">Log in to Mediasite</a></li>
                                <li>Find your presentation and click the title to open the details page</li>
                                <li>Along the right side, change Who Can View? to My Organization, which will allow any Ball State user with the link to view the video</li>
                                <li>Click Share Presentation</li>
                                <li>Click Copy next to the Quick Link at the top</li>
                                <li>Paste the link in the box above</li>
                                </ol>
                                </div>
                                </div>
                                <div class="instructions">
                                <h2>Note</h2>
                                <p>Read more about <a href="https://bsu.instructure.com/courses/123947/pages/responsive-video-embed" target="_blank">Responsive Video Embed styles in Beautiful Canvas Pages Made Easy</a>.</p>
                                </div>`;
                    break;
                case 'image':
                    elementContent = `<div class="builder-field image-style carousel">
                            <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Browse the 8 available image styles. Click the button to apply the chosen style to your image."></a>Image Style</p>
                            <button class="apply-style"><i class="fa-solid fa-paintbrush"></i> Apply Style to Image</button>
                            <div class="swiper">
                            <div class="swiper-wrapper">
                            <div class="swiper-slide"><div class="bsu-image-gray"><img src="https://bsu.instructure.com/courses/123947/files/12541375/preview" alt="Beneficence Statue on Ball State University Campus"></div></div>
                            <div class="swiper-slide"><div class="bsu-image-circle"><img src="https://bsu.instructure.com/courses/123947/files/12541375/preview" alt="Beneficence Statue on Ball State University Campus"></div></div>
                            <div class="swiper-slide"><div class="bsu-image-shadow-square"><img src="https://bsu.instructure.com/courses/123947/files/12541375/preview" alt="Beneficence Statue on Ball State University Campus"></div></div>
                            <div class="swiper-slide"><div class="bsu-image-shadow-corners"><img src="https://bsu.instructure.com/courses/123947/files/12541375/preview" alt="Beneficence Statue on Ball State University Campus"></div></div>
                            <div class="swiper-slide"><div><div class="bsu-image-shadow-circle"><img src="https://bsu.instructure.com/courses/123947/files/12541375/preview" alt="Beneficence Statue on Ball State University Campus"></div></div></div>
                            <div class="swiper-slide"><figure class="bsu-image-caption"><img src="https://bsu.instructure.com/courses/123947/files/12541375/preview" alt="Beneficence Statue on Ball State University Campus"/>
                            <figcaption>Caption goes here.</figcaption></figure></div>
                            <div class="swiper-slide"><figure class="bsu-image-polaroid"><img src="https://bsu.instructure.com/courses/123947/files/12541375/preview" alt="Beneficence Statue on Ball State University Campus" />
                            <figcaption>Caption goes here.</figcaption></figure></div>
                            <div class="swiper-slide"><div class="bsu-image-hero"><img src="https://bsu.instructure.com/courses/123947/files/12541375/preview" alt="Beneficence Statue on Ball State University Campus" /><div class="bsu-image-hero-heading"><h2>HERO IMAGE HEADING</h2></div></div></div>            
                            </div>     
                            <div class="swiper-pagination"></div>
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
                            </div>
                            </div>
                            <div class="builder-field image-campus dropdown">
                            <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="If you want to use an image of the Ball State campus, select an option from the dropdown."></a>Ball State Campus Images</p>
                            <select>
                            <option value="beneficence-">Beneficence (Landscape)</option>
                            <option value="beneficence-fall">Beneficence in Fall (Portrait)</option>
                            <option value="frog-baby">Frog Baby (Portrait)</option>
                            <option value="shafer">Shafer Tower (Portrait)</option>
                            <option value="shafer-flowers">Shafer Tower with Flowers (Landscape)</option>
                            <option value="mckinley">McKinley Avenue (Landscape)</option>
                            <option value="aerial">Aerial Campus Photo (Landscape)</option>
                            </select>
                            </div>
                            <div class="instructions">
                            <h2>Note</h2>
                            <p>You will need to replace the placeholder image in the Canvas editor, rather than here in the Beautiful Canvas Builder. If you want to use an image of the Ball State campus, you may choose one below. This can also let you see how different images work on the page with your chosen style.</p>
                            <p>Read more about <a href="https://bsu.instructure.com/courses/123947/pages/images" target="_blank">Image styles in Beautiful Canvas Pages Made Easy</a>.</p>
                            </div>`;
                    break;
                case 'accordion':
                    elementContent = `<div class="builder-field accordion-style dropdown">
                            <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Choose from one of 4 styles for accordions."></a>Accordion Style</p>
                            <select>
                            <option value="accordion">Standard</option>
                            <option value="accordion-small">Small</option>
                            <option value="accordion-dark">Dark</option>
                            <option value="accordion-cards">Cards</option>
                            </select>
                            </div>
                            <div class="builder-field accordion-number number">
                            <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Each collapsable section is 1 accordion."></a>Number of Accordions</p>
                            <input class="accordion-spinner" value="1">
                            </div>
                            <div class="instructions">
                            <h2>Note</h2>
                            <p>Read more about <a href="https://bsu.instructure.com/courses/123947/pages/accordions" target="_blank">Accordion styles in Beautiful Canvas Pages Made Easy</a>.</p>
                            </div>`;
                    break;
                case 'columns':
                    elementContent = `<div class="builder-field column-type">
                            <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Click on a column configuration to apply it to your columns."></a>Column Type</p>
                            <div class="bsu-column-row half-half">
                            <div class="bsu-half demo">
                            </div>
                            <div class="bsu-half demo">
                            </div>
                            </div>
                            <div class="bsu-column-row thirds">
                            <div class="bsu-one-third demo">
                            </div>
                            <div class="bsu-one-third demo">
                            </div>
                            <div class="bsu-one-third demo">
                            </div>
                            </div>
                            <div class="bsu-column-row third-first">
                            <div class="bsu-one-third demo">
                            </div>
                            <div class="bsu-two-thirds demo">
                            </div>
                            </div>
                            <div class="bsu-column-row third-last">
                            <div class="bsu-two-thirds demo">
                            </div>
                            <div class="bsu-one-third demo">
                            </div>
                            </div>
                            </div>
                            <div class="instructions">
                            <h2>Note</h2>
                            <p>Canvas automatically deletes any empty columns, so columns <strong>must contain content in them</strong> in order to work properly.</p>
                            <p>Read more about <a href="https://bsu.instructure.com/courses/123947/pages/columns" target="_blank">Column styles in Beautiful Canvas Pages Made Easy</a>.</p>
                            </div>`;
                    break;
                case 'table':
                    elementContent = `<div class="builder-field table-rows number">
                            <p class="question-text">Number of Rows (Incl. Header Row)</p>
                            <input class="table-spinner" value="2">
                            </div>
                            <div class="builder-field table-columns number">
                            <p class="question-text">Number of Columns</p>
                            <input class="table-spinner" value="2">
                            </div>
                            <div class="instructions">
                            <h2>Note</h2>
                            <p>Read more about <a href="https://bsu.instructure.com/courses/123947/pages/tables" target="_blank">Table styles in Beautiful Canvas Pages Made Easy</a>.</p>
                            </div>`;
                    break;
                case 'progressbar':
                    elementContent = `<div class="builder-field progress-number number">
                            <p class="question-text"><a class="tooltip" href="javascript:void(0)" data-tooltip="Enter the percent progress you want to display on the progress bar."></a>% Progress</p>
                            <input class="progress-spinner" value="50">
                            </div>
                            <div class="instructions">
                            <h2>Note</h2>
                            <p>This progress bar will be static, meaning it does not automatically change depending on how much a student has completed. Only use it when you have clear steps that will be followed in order.</p>
                            <p>Read more about <a href="https://bsu.instructure.com/courses/123947/pages/progress-bar" target="_blank">Progress Bar styles in Beautiful Canvas Pages Made Easy</a>.</p>
                            </div>`;
            }
            return elementContent;
        });

        //🧨 Setup various elements
        $('.accordion-spinner').spinner({
            min: 1
        });
        $('.table-spinner').spinner({
            min: 2
        });
        $('.progress-spinner').spinner({
            min: 10,
            max: 100
        })
        const swiper = new Swiper('.swiper', {
            direction: 'horizontal',
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });

        //🧨 Change default icon on certain elements
        $('.button-icon-selection input:checked').prop('checked', false);
        $(`.button-icon-selection #icon-link-${elementId}`).prop('checked', true).trigger('change');

        //💡 Initialize builder settings tooltips
        $('#builder .tooltip').tooltip({
            position: {
                my: 'right',
                at: 'left-40',
                collision: 'none'
            },
            items: '[data-tooltip]',
            content: function () {
                return $(this).data('tooltip');
            },
            classes: {
                'ui-tooltip-content': 'left'
            }
        });
        return elementId;
    }

    $('.content-type').click(function () {
        createBuilderElement(createEditorElement(setElementType($(this))));
    });

    //✅ Enable/disable editor menu buttons on change
    $('#editor').on('buttonStateChange', '.editor-element', function () {
        const moveUp = $(this).children('.editor-menu').find('.move-up');
        const moveDown = $(this).children('.editor-menu').find('.move-down');
        if ($(this).is(':first-of-type') && !$(this).parent().closest('.editor-element').hasClass('columns')) {
            moveUp.addClass('disabled');
        } else {
            moveUp.removeClass('disabled');
        }
        if ($(this).is(':last-of-type') && !$(this).parent().closest('.editor-element').hasClass('columns')) {
            moveDown.addClass('disabled');
        }
        else {
            moveDown.removeClass('disabled');
        }
    });


    //👯‍♀️ Duplicate on button click
    $('#editor').on('click', '.editor-menu .duplicate', function () {
        const element = $(this).closest('.editor-element');
        const elementId = element.attr('id');
        const builderElement = $(`[data-element="${elementId}"]`);
        const selectedVal = builderElement.find(':selected').attr('value');
        const newElement = element.clone().removeAttr('id').uniqueId();
        const newElementId = newElement.attr('id');
        let newBuilderElement = builderElement.clone().attr('data-element', `${newElementId}`);
        //Update dropdown since clone does not copy dropdown status
        newBuilderElement.find(`[value=${selectedVal}]`).prop('selected', true);
        newElement.insertAfter(element);
        makeElementActive(newElement);
        builderElement.hide();
        const updateId = function (target, type) {
            return target.attr(`${type}`).replace(`${elementId}`, `${newElementId}`);
        }
        newBuilderElement.find('[for]').each(function () {
            $(this).attr('for', updateId($(this), 'for'));
        });
        newBuilderElement.find('[id]').each(function () {
            $(this).attr('id', updateId($(this), 'id'));
        });
        newBuilderElement.find('[name]').each(function () {
            $(this).attr('for', updateId($(this), 'name'));
        });
        newBuilderElement.insertAfter(builderElement);
        $('.editor-element').trigger('buttonStateChange');
    });

    //🚗 Move items up or down
    const moveItem = function (target, type) {
        const buttonDisabled = target.closest('button').hasClass('disabled');
        const element = target.closest('.editor-element');
        const inColumns = element.parent().closest('.editor-element').hasClass('columns');
        const prevElement = element.prev();
        const nextElement = element.next();
        const columnRow = element.closest('.columns');
        const columnClasses = '.bsu-half, .bsu-one-third, .bsu-two-thirds';
        const column = target.closest(columnClasses);
        const prevColumn = column.prev(columnClasses);
        const nextColumn = column.next(columnClasses);
        if (!buttonDisabled) {
            if (type === 'up') {
                if (!inColumns && !prevElement.hasClass('columns') || element.hasClass('columns')) {
                    element.insertBefore(prevElement).hide().fadeIn();
                } else if (!inColumns && prevElement.hasClass('columns')) {
                    prevElement.find('.bsu-half, .bsu-one-third, .bsu-two-thirds').last().removeClass('empty').append(element).hide().fadeIn();
                }
            }
            if (type === 'down') {
                if (!inColumns && !nextElement.hasClass('columns') || element.hasClass('columns')) {
                    element.insertAfter(nextElement).hide().fadeIn();
                } else if (!inColumns && nextElement.hasClass('columns')) {
                    nextElement.find('.bsu-half, .bsu-one-third, .bsu-two-thirds').first().removeClass('empty').prepend(element).hide().fadeIn();
                }
            }
            if (inColumns) {
                if (!prevElement.length && !nextElement.length) {
                    column.addClass('empty');
                }
                if (type === 'up') {
                    if (!prevElement.length && column.is(':first-child')) {
                        element.insertBefore(columnRow).hide().fadeIn();
                    } else if (!prevElement.length) {
                        element.appendTo(prevColumn).hide().fadeIn();
                        if (prevColumn.hasClass('empty')) {
                            prevColumn.removeClass('empty');
                        }
                    } else if (prevElement.length) {
                        element.insertBefore(prevElement).hide().fadeIn();
                    }
                }
                if (type === 'down') {
                    if (!prevElement.length && !nextElement.length) {
                        column.addClass('empty');
                    }
                    if (!nextElement.length && column.is(':last-child')) {
                        element.insertAfter(columnRow).hide().fadeIn();
                    } else if (!nextElement.length) {
                        element.prependTo(nextColumn).hide().fadeIn();
                        if (nextColumn.hasClass('empty')) {
                            nextColumn.removeClass('empty');
                        }
                    } else if (nextElement.length) {
                        element.insertAfter(nextElement).hide().fadeIn();
                    }
                }
            }
        }
        $('.editor-element').trigger('buttonStateChange');
    }
    $('#editor').on('click', '.editor-menu .move-up', function (event) {
        moveItem($(event.target), 'up');
    });
    $('#editor').on('click', '.editor-menu .move-down', function (event) {
        moveItem($(event.target), 'down');
    });

    const updateSettings = function (target) {
        const elementId = $(target).closest('.builder-element').attr('data-element');
        const elementType = $(`#${elementId}`).attr('class').split(' ')[1];
        const setting = $(target).attr('class').split(' ')[1];
        let element;
        let selectedVal;
        //📃 Headings
        if (elementType === 'sectionheading') {
            element = $(`#${elementId}`).find('h2, h3');
            //Heading level
            if (setting === 'heading-level') {
                selectedVal = $(target).find(':checked').attr('value');
                if (selectedVal === 'level-2') {
                    element.replaceWith(function () {
                        return $('<h2>', {
                            class: $(this).attr('class'),
                            html: $(this).html()
                        })
                    });
                } else if (selectedVal === 'level-3') {
                    element.replaceWith(function () {
                        return $('<h3>', {
                            class: $(this).attr('class'),
                            html: $(this).html()
                        })
                    });
                }
            }
            //Heading style
            if (setting === 'heading-style') {
                selectedVal = target.find(':selected').attr('value');
                if (selectedVal !== 'black-icon' && selectedVal !== 'red-icon') {
                    target.closest('.builder-element').find('.icon').fadeOut();
                }
                else {
                    target.closest('.builder-element').find('.icon').fadeIn();
                }
                switch (selectedVal) {
                    case 'red-background': element.attr('class', 'bsu-red-background');
                        break;
                    case 'red-bar': element.attr('class', 'bsu-red-bar');
                        break;
                    case 'gray-background': element.attr('class', 'bsu-gray-background');
                        break;
                    case 'gray-bar': element.attr('class', 'bsu-gray-bar');
                        break;
                    case 'black-icon': element.attr('class', 'bsu-black-icon');
                        break;
                    case 'red-icon': element.attr('class', 'bsu-red-icon');
                        break;
                }
                switch (selectedVal) {
                    case 'red-background':
                    case 'red-bar':
                    case 'gray-background':
                    case 'gray-bar': element.find('i').remove();
                        break;
                    case 'black-icon':
                    case 'red-icon': if (!element.find('i').length) {
                        const icon = target.closest('.builder-element').find('.icon-selection input:checked').val();
                        element.prepend(`<i class="fa-solid fa-${icon}"></i>`);
                    }
                        break;
                }
            }
        }
    }

    //🗂️ Settings updates on click
    //Headings
    $('#builder').on('change', '.heading-style select, .heading-level input', function (event) {
        updateSettings($(event.target).closest('.builder-field'));
    });

    //🗂️ Individual elements 
    //🎨 Icons
    $('#builder').on('change', '.builder-field.icon-selection input[type=radio]', function () {
        const elementID = $(this).closest('.builder-element').attr('data-element');
        const selectedVal = $(this).val();
        $(`#${elementID} i`).not('.editor-menu i.fa-solid').attr('class', `fa-solid fa-${selectedVal}`);
    });

    $('#builder').on('change keyup', '.builder-field.icon-selection input[type=text]', function () {
        const elementID = $(this).closest('.builder-element').attr('data-element');
        const selectedVal = $(this).val();
        $(this).closest('.builder-element').find('.icon-group .selected').removeClass('selected');
        $(this).closest('.builder-element').find('.icon-group').find(':checked').prop('checked', false);
        if (selectedVal.includes('<i class=')) {
            $(`#${elementID} i`).not('.editor-menu i.fa-solid').replaceWith(selectedVal);
        } else {
            $(`#${elementID} i`).not('.editor-menu i.fa-solid').attr('class', `fa-solid fa-${selectedVal}`);
        }
    });

    //🔗 Buttons
    //Button style
    $('#builder').on('change', '.button-style select', function () {
        const selectedVal = $(this).val();
        const elementID = $(this).closest('.builder-element').attr('data-element');
        const element = $(`#${elementID} .bsu-button`);
        element.removeClass('bsu-button-red bsu-button-white bsu-button-gray bsu-button-red-animated bsu-button-text')
        switch (selectedVal) {
            case 'red': element.addClass('bsu-button-red');
                break;
            case 'white': element.addClass('bsu-button-white');
                break;
            case 'gray': element.addClass('bsu-button-gray');
                break;
            case 'red-animated': element.addClass('bsu-button-red-animated');
                break;
            case 'text': element.addClass('bsu-button-text');
                break;
        }
        switch (selectedVal) {
            case 'red':
            case 'white':
            case 'gray': $(this).closest('.builder-element').find('.button-shadow').fadeIn();
                break;
            case 'red-animated':
            case 'text': $(this).closest('.builder-element').find('.button-shadow input').prop('checked', false).trigger('change');
                $(this).closest('.builder-element').find('.button-shadow').fadeOut();
                break;
        }
    });

    //Button link
    $('#builder').on('change paste keyup input', '.button-link input', function () {
        const selectedVal = $(this).val();
        const elementID = $(this).closest('.builder-element').attr('data-element');
        $(`#${elementID} .bsu-button`).attr('href', selectedVal);
    });

    //Button new tab
    $('#builder').on('change', '.button-new-tab input', function () {
        const elementID = $(this).closest('.builder-element').attr('data-element');
        if ($(this).prop('checked')) {
            $(`#${elementID} .bsu-button`).attr('target', '_blank');
        }
        else {
            $(`#${elementID} .bsu-button`).removeAttr('target');
        }
    });

    //Button shadow
    $('#builder').on('change', '.button-shadow input', function (event) {
        const elementID = $(this).closest('.builder-element').attr('data-element');
        const element = $(`#${elementID} .bsu-button`);
        if ($(this).prop('checked') && !element.hasClass('bsu-button-text') && !element.hasClass('bsu-button-red-animated')) {
            element.addClass('bsu-button-shadow');
        }
        else {
            element.removeClass('bsu-button-shadow');
        }
    });

    //Button icon
    $('#builder').on('change', '.button-icon input', function () {
        const elementID = $(this).closest('.builder-element').attr('data-element');
        const element = $(`#${elementID} .bsu-button`);
        if ($(this).prop('checked')) {
            $(this).closest('.builder-element').find('.button-icon-selection').fadeIn();
            const icon = $(this).closest('.builder-element').find('.icon-selection input:checked').val();
            if (!element.find('i').length) {
                element.prepend(`<i class="fa-solid fa-${icon}"></i>`);
            }
            else {
                $(`${element} i`).attr('class', `fa-solid fa-${icon}`);
            }
        }
        else {
            $(this).closest('.builder-element').find('.button-icon-selection').fadeOut();
            element.find('i').remove();
        }
    });

    //💬 Quotes
    //Quote style
    $('#builder').on('change', '.quote-style select', function () {
        const selectedVal = $(this).val();
        const elementID = $(this).closest('.builder-element').attr('data-element');
        const element = $(`#${elementID} figure`);
        switch (selectedVal) {
            case 'red-large': element.attr('class', 'bsu-quote-red-large');
                break;
            case 'gray-large': element.attr('class', 'bsu-quote-gray-large');
                break;
            case 'gray-small': element.attr('class', 'bsu-quote-gray-small');
                break;
        }
    });

    //Quote attribution
    $('#builder').on('change', '.quote-attribution input', function () {
        const elementID = $(this).closest('.builder-element').attr('data-element');
        const figcaption = $(`#${elementID} figcaption`).length;
        if ($(this).prop('checked') && figcaption === 0) {
            $(`#${elementID} blockquote`).append('<figcaption>Attribution line for quote</figcaption>');
        }
        else {
            $(`#${elementID} figcaption`).remove();
        }
    });

    //📃 Lists
    //List style
    $('#builder').on('change', '.list-style input', function () {
        const selectedVal = $(this).val();
        const elementID = $(this).closest('.builder-element').attr('data-element');
        const element = $(`#${elementID}`).find('ol, ul');
        switch (selectedVal) {
            case 'checks':
            case 'circle': element.attr('class', 'bsu-list');
                break;
            case 'carets': element.attr('class', 'bsu-carets');
                break;
            case 'timeline': element.attr('class', 'bsu-timeline');
                break;
        }
    });

    //📦 Emphasis boxes
    //Emphasis style
    $('#builder').on('change', '.emphasis-style select', function () {
        const selectedVal = $(this).val();
        const elementID = $(this).closest('.builder-element').attr('data-element');
        const element = $(`#${elementID}`).find('.bsu-emphasis-large, .bsu-emphasis-small');
        switch (selectedVal) {
            case 'red-icon': element.attr('class', 'bsu-emphasis-large bsu-emphasis-red-icon');
                break;
            case 'gray-icon': element.attr('class', 'bsu-emphasis-large bsu-emphasis-gray-icon');
                break;
            case 'red-large': element.attr('class', 'bsu-emphasis-large bsu-emphasis-red');
                break;
            case 'black': element.attr('class', 'bsu-emphasis-large bsu-emphasis-black');
                break;
            case 'red-small': element.attr('class', 'bsu-emphasis-small bsu-emphasis-red');
                break;
            case 'gray': element.attr('class', 'bsu-emphasis-small bsu-emphasis-gray');
                break;
            case 'red-outline': element.attr('class', 'bsu-emphasis-small bsu-emphasis-red-outline');
                break;
            case 'gray-outline': element.attr('class', 'bsu-emphasis-small bsu-emphasis-gray-outline');
                break;
        }
        switch (selectedVal) {
            case 'red-icon':
            case 'gray-icon':
                $(this).closest('.builder-element').find('.icon-selection').fadeIn();
                const icon = $(this).closest('.builder-element').find('.icon-selection input:checked').val();
                if (!element.find('i').length) {
                    element.find('h2').prepend(`<i class="fa-solid fa-${icon}"></i>`);
                }
                break;
            default: $(this).closest('.builder-element').find('.icon-selection').fadeOut();
                element.find('i').remove();
                break;
        }
    });

    //🎁 Tags
    //Tag style
    $('#builder').on('change', '.tag-style select', function () {
        const selectedVal = $(this).val();
        const elementID = $(this).closest('.builder-element').attr('data-element');
        const element = $(`#${elementID}`).find('.bsu-tag-red, .bsu-tag-gray, .bsu-tag-stripe, .bsu-pill');
        if (element.hasClass('bsu-pill')) {
            switch (selectedVal) {
                case 'red': element.replaceWith('<p class="bsu-tag-red">Tag Text</p>');
                    break;
                case 'gray': element.replaceWith('<p class="bsu-tag-gray">Tag Text</p>');
                    break;
                case 'stripe': element.replaceWith('<p class="bsu-tag-stripe">Tag Text</p>');
                    break;
            }
        } else {
            switch (selectedVal) {
                case 'red': element.attr('class', 'bsu-tag-red');
                    break;
                case 'gray': element.attr('class', 'bsu-tag-gray');
                    break;
                case 'stripe': element.attr('class', 'bsu-tag-stripe');
                    break;
                case 'pill': element.replaceWith('<div class="bsu-pill"><p>Pill Part 1</p><p>Pill Part 2</p></div>');
            }
        }
    });

    //📏 Divider lines
    //Divider style
    $('#builder').on('change', '.divider-style select', function () {
        const selectedVal = $(this).val();
        const elementID = $(this).closest('.builder-element').attr('data-element');
        $(`#${elementID}`).find('hr').attr('class', `bsu-${selectedVal}`);
    });

    //📹 Videos
    //Video service
    $('#builder').on('change', '.video-service select', function () {
        const selectedVal = $(this).val();
        $(this).closest('.builder-element').find('.instructions').first().attr('class', `instructions ${selectedVal}`);
        const mediasite = `<h2>Mediasite</h2>
        <ol class="bsu-list">
        <li><a href="https://ballstate.mediasite.com/Mediasite/mymediasite">Log in to Mediasite</a></li>
        <li>Find your presentation and click the title to open the details page</li>
        <li>Along the right side, change Who Can View? to My Organization, which will allow any Ball State user with the link to view the video</li>
        <li>Click Share Presentation</li>
        <li>Click Copy next to the Quick Link at the top</li>
        <li>Paste the link in the box above</li>
        </ol>`;
        const youtube = `<h2>YouTube</h2>
        <ol class="bsu-list">
        <li>Find the YouTube video you want to embed</li>
        <li>Copy the URL from your browser address bar</li>
        <li>Paste the link in the box above</li>
        </ol>`;
        const vimeo = `<h2>Vimeo</h2>
        <ol class="bsu-list">
        <li>Find the Vimeo video you want to embed</li>
        <li>Copy the URL from your browser address bar</li>
        <li>Paste the link in the box above</li>
        </ol>`;
        switch (selectedVal) {
            case 'mediasite':
                $(this).closest('.builder-element').find('.instructions').first().html(mediasite);
                break;
            case 'youtube':
                $(this).closest('.builder-element').find('.instructions').first().html(youtube);
                break;
            case 'vimeo':
                $(this).closest('.builder-element').find('.instructions').first().html(vimeo);
                break;
        }
    });

    //Video link
    $('#builder').on('paste keyup input', '.video-link input', function () {
        const selectedVal = $(this).val();
        const service = $(this).closest('.builder-element').find('.video-service').find('select').val();
        const elementID = $(this).closest('.builder-element').attr('data-element');
        $(`#${elementID} iframe`).remove();
        switch (service) {
            case 'mediasite':
                function mediasiteParser(url) {
                    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    const match = url.match(regExp);
                    if (match && match[2].length == 11) {
                        return match[2];
                    } else {
                        //error
                    }
                };
                $(`#${elementID} .bsu-video`).append(`<iframe src="${selectedVal}" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0" allowfullscreen msallowfullscreen allow="fullscreen"></iframe>`);
                break;
            case 'youtube':
                function youtubeParser(url) {
                    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    const match = url.match(regExp);
                    if (match && match[2].length == 11) {
                        return match[2];
                    } else {
                        //error
                    }
                };
                $(`#${elementID} .bsu-video`).append(`<iframe src="https://www.youtube.com/embed/${youtubeParser(selectedVal)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
                break;
            case 'vimeo':
                function vimeoParser(url) {
                    const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/
                    const match = url.match(regExp);
                    if (match) {
                        return match[5];
                    }
                    else {
                        //error
                    }
                }
                $(`#${elementID} .bsu-video`).append(`<iframe src="https://player.vimeo.com/video/${vimeoParser(selectedVal)}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`);
                break;
        }
    });

    //🌄 Images
    //Image style
    $('#builder').on('click', '.apply-style', function () {
        const selectedVal = $(this).closest('.builder-field').find('.swiper-slide-active').find('.bsu-image-circle, .bsu-image-gray, .bsu-image-shadow-circle, .bsu-image-shadow-corners, .bsu-image-shadow-square, .bsu-image-caption, .bsu-image-polaroid, .bsu-image-hero').attr('class');
        const elementID = $(this).closest('.builder-element').attr('data-element');
        const elementContainer = $(`#${elementID}`).children().not('.editor-menu').first();
        const currentStyle = elementContainer.attr('class');
        const image = elementContainer.find('img');
        if (selectedVal === currentStyle) {
            return;
        }
        switch (selectedVal) {
            case 'bsu-image-circle':
            case 'bsu-image-gray':
            case 'bsu-image-shadow-circle':
            case 'bsu-image-shadow-corners':
            case 'bsu-image-shadow-square':
                elementContainer.replaceWith($('<div/>').addClass(selectedVal).append(image));
                break;
            case 'bsu-image-caption':
            case 'bsu-image-polaroid':
                if (elementContainer.find('figcaption').length) {
                    elementContainer.replaceWith($('<figure/>').addClass(selectedVal).append(image).append(`<figcaption>${elementContainer.find('figcaption').text()}</figcaption>`));
                } else {
                    elementContainer.replaceWith($('<figure/>').addClass(selectedVal).append(image).append('<figcaption>Caption goes here.</figcaption>'));
                }
                break;
            case 'bsu-image-hero':
                elementContainer.replaceWith($('<div/>').addClass('bsu-image-hero').append(image).append('<div class="bsu-image-hero-heading"><h2>HERO IMAGE HEADING</h2></div>'));
        };
    });

    //Image campus
    $('#builder').on('change', '.image-campus select', function () {
        const selectedVal = $(this).val();
        const elementID = $(this).closest('.builder-element').attr('data-element');
        let imageSource, imageAlt;
        switch (selectedVal) {
            case 'beneficence':
                imageSource = 'https://bsu.instructure.com/courses/123947/files/12541375/preview';
                imageAlt = 'Beneficence Statue on Ball State University Campus';
                break;
            case 'beneficence-fall':
                imageSource = 'https://bsu.instructure.com/courses/123947/files/12541374/preview';
                imageAlt = 'Beneficence Statue on Ball State University Campus';
                break;
            case 'frog-baby':
                imageSource = 'https://bsu.instructure.com/courses/123947/files/12541313/preview';
                imageAlt = 'Frog Baby Statue on Ball State University Campus';
                break;
            case 'shafer':
                imageSource = 'https://bsu.instructure.com/courses/123947/files/12541299/preview';
                imageAlt = 'Shafer Tower on Ball State University Campus';
                break;
            case 'shafer-flowers':
                imageSource = 'https://bsu.instructure.com/courses/123947/files/12541300/preview';
                imageAlt = 'Shafer Tower on Ball State University Campus';
                break;
            case 'mckinley':
                imageSource = 'https://bsu.instructure.com/courses/123947/files/12541312/preview';
                imageAlt = 'McKinley Avenue on Ball State University Campus';
                break;
            case 'aerial':
                imageSource = 'https://bsu.instructure.com/courses/123947/files/12541307/preview';
                imageAlt = 'Aerial View of Ball State University Campus';
                break;
        }
        $(`#${elementID}`).find('img').attr('src', imageSource);
        $(`#${elementID}`).find('img').attr('alt', imageAlt);
        $(this).closest('.builder-element').find('img').attr('src', imageSource);
    });

    //🎶 Accordions
    //Accordion style
    $('#builder').on('change', '.accordion-style select', function () {
        const selectedVal = $(this).val();
        const elementID = $(this).closest('.builder-element').attr('data-element');
        $(`#${elementID}`).find('.bsu-accordion, .bsu-accordion-small, .bsu-accordion-dark, .bsu-accordion-cards').attr('class', `bsu-${selectedVal}`);
    });

    //Accordion number
    function updateAccordions() {
        const selectedVal = $(this).closest('.accordion-number').find('input').val();
        if (selectedVal < 1) {
            $(this).closest('.builder-field').find('input').val('1');
        }
        const elementID = $(this).closest('.builder-element').attr('data-element');
        const currentAccordions = $(`#${elementID}`).find('details').length;
        const difference = selectedVal - currentAccordions;
        const accordion = '<details open><summary>Accordion Title</summary><div><p>Contents of the accordion.</p></div></details>';
        if (selectedVal > currentAccordions) {
            const accordions = accordion.repeat(difference);
            $(`#${elementID}`).find('.bsu-accordion, .bsu-accordion-small, .bsu-accordion-dark, .bsu-accordion-cards').append(accordions);
        } else if (selectedVal < currentAccordions) {
            $(`#${elementID}`).find('details').slice(difference).remove();
        }
    };
    $('#builder').on('input change keyup', '.accordion-number input', updateAccordions);
    $('#builder').on('click', '.accordion-number .ui-button', updateAccordions);

    //🏢 Columns
    //Column type
    $('#builder').on('click', '.bsu-column-row', function () {
        const selectedVal = $(this).attr('class').split(' ').pop();
        const elementID = $(this).closest('.builder-element').attr('data-element');
        const currentColumnCount = $(`#${elementID}`).find('.bsu-column-row').children().length;
        const columns = $(`#${elementID} .bsu-column-row`).find('.bsu-half, .bsu-one-third, .bsu-two-thirds');
        const columnElement = $(`#${elementID}`);
        switch (selectedVal) {
            case 'half-half':
                columns.removeClass('bsu-half bsu-one-third bsu-two-thirds').addClass('bsu-half');
                if (currentColumnCount === 3) {
                    columns.last().contents().insertAfter(columnElement).hide().fadeIn();
                    columns.last().remove();
                }
                break;
            case 'thirds':
                columns.removeClass('bsu-half bsu-one-third bsu-two-thirds').addClass('bsu-one-third');
                if (currentColumnCount === 2) {
                    $(`#${elementID} .bsu-column-row`).append('<div class="bsu-one-third empty"></div>');
                }
                break;
            case 'third-first':
                columns.first().removeClass('bsu-half bsu-one-third bsu-two-thirds').addClass('bsu-one-third');
                if (currentColumnCount === 2) {
                    columns.last().removeClass('bsu-half bsu-one-third bsu-two-thirds').addClass('bsu-two-thirds');
                } else if (currentColumnCount === 3) {
                    columns.filter(':nth-child(2)').removeClass('bsu-half bsu-one-third bsu-two-thirds').addClass('bsu-two-thirds');
                    columns.last().contents().insertAfter(columnElement).hide().fadeIn();
                    columns.last().remove();
                }
                break;
            case 'third-last':
                columns.first().removeClass('bsu-half bsu-one-third bsu-two-thirds').addClass('bsu-two-thirds');
                if (currentColumnCount === 2) {
                    columns.last().removeClass('bsu-half bsu-one-third bsu-two-thirds').addClass('bsu-one-third');
                } else if (currentColumnCount === 3) {
                    columns.filter(':nth-child(2)').removeClass('bsu-half bsu-one-third bsu-two-thirds').addClass('bsu-one-third');
                    columns.last().contents().insertAfter(columnElement).hide().fadeIn();
                    columns.last().remove();
                }
                break;
        }
    });

    //🏓 Tables
    //Table rows and columns
    function updateTable() {
        const selectedVal = $(this).closest('.builder-field').find('input').val();
        if (selectedVal < 2) {
            $(this).closest('.builder-field').find('input').val('2');
        }
        const elementID = $(this).closest('.builder-element').attr('data-element');
        const currentRows = $(`#${elementID}`).find('tr').length;
        const currentColumns = $(`#${elementID}`).find('tr').first().find('th').length;
        const rowDifference = selectedVal - currentRows;
        const columnDifference = selectedVal - currentColumns;
        const tableRow = '<tr/>';
        if ($(this).closest('.builder-field').attr('class').includes('table-rows') && selectedVal > currentRows) {
            const bodyCells = '<td>Body cell</td>'.repeat(currentColumns);
            const emptyRows = tableRow.repeat(rowDifference);
            const tableRows = $(emptyRows).append(bodyCells);
            $(`#${elementID}`).find('.bsu-stripe').append(tableRows);
        } else if ($(this).closest('.builder-field').attr('class').includes('table-rows') && selectedVal < currentRows) {
            $(`#${elementID}`).find('tr').slice(rowDifference).remove();
        } else if ($(this).closest('.builder-field').attr('class').includes('table-columns') && selectedVal > currentColumns) {
            const headerCells = '<th>Header Cell</th>'.repeat(columnDifference);
            const bodyCells = '<td>Body cell</td>'.repeat(columnDifference);
            $(`#${elementID}`).find('tr').first().append(headerCells);
            $(`#${elementID}`).find('tr').not(':first-child').append(bodyCells);
        } else if ($(this).closest('.builder-field').attr('class').includes('table-columns') && selectedVal < currentColumns) {
            $(`#${elementID}`).find('th').filter(`:nth-child(n+${Number(selectedVal) + 1})`).remove();
            $(`#${elementID}`).find('td').filter(`:nth-child(n+${Number(selectedVal) + 1})`).remove();
        }
    };
    $('#builder').on('input change keyup', '.table-rows input, .table-columns input', updateTable);
    $('#builder').on('click', '.table-rows .ui-button, .table-columns .ui-button', updateTable);

    //🍷 Progress bars
    //Progress bar
    function updateProgress() {
        const selectedVal = $(this).closest('.builder-field').find('input').val();
        if (selectedVal < 0) {
            $(this).closest('.builder-field').find('input').val('0');
        } else if (selectedVal > 100) {
            $(this).closest('.builder-field').find('input').val('100');
        }
        const elementID = $(this).closest('.builder-element').attr('data-element');
        $(`#${elementID} .bsu-progress`).attr('aria-valuenow', selectedVal);
        $(`#${elementID} .bsu-progress`).children('div').css('width', `${selectedVal}%`);
        $(`#${elementID} .bsu-progress`).children('div').text(`${selectedVal}%`);
    };
    $('#builder').on('input change keyup', '.progress-number input', updateProgress);
    $('#builder').on('click', '.progress-number .ui-button', updateProgress);
});
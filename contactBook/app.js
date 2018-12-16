$(() => {
    // let container = $('#book');
    const list = $('#list .content');
    const details = $('#details');
    const context = {allPeople: []};
    populateList();

    async function populateList() {
        let [singleListSource, allContactsSource,detailsSource] = await Promise.all([$.get('singleContact.html'), $.get('allContacts.html'),$.get('details.html')]);
        context.allPeople = await $.get('data.json');

        Handlebars.registerPartial('singleListP', singleListSource);
        let allContactsTemplate = Handlebars.compile(allContactsSource);
        let detailsTemplate = Handlebars.compile(detailsSource);

        list.html(allContactsTemplate(context));

        $('.contact').click(function(target){
            $('#circularGOne').remove();
            let index = $(target.currentTarget).attr('data-id');
          let selectedContact = context.allPeople[index]
            details.append(detailsTemplate(selectedContact))
        });
    }
});
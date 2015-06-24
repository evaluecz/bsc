describe('TEST', function(){

    it('Add Note', function(){
        browser.get('http://localhost:9000/');
        element(by.id('btnAddNote')).click();
        element(by.model('title')).sendKeys("Nova poznamka");
        element(by.id('btnAppendNote')).click();
    });

    it('List of Notes', function(){
        browser.get('http://localhost:9000/');
        var notesList = element.all(by.css('.note'));
        expect(notesList.count()).toEqual(4);
    });

});
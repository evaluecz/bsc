describe('TEST', function(){

    it('Homepage', function() {
        browser.get('http://localhost:9000/');
        expect(browser.getTitle()).toEqual('eValue for BSC');
    });

    it('Add Note', function(){
        browser.get('http://localhost:9000/');
        element(by.id('btnAddNote')).click();
        element(by.model('title')).sendKeys("Nova poznamka");
        element(by.id('btnAppendNote')).click();
        var notesList = element.all(by.css('.note'));
        expect(notesList.count()).toEqual(3);
    })

});
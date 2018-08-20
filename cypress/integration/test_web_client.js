function setText(text) {
    cy.window().then(win => win.editor.val(text))
}

function assertText(text) {
    cy.window().then(win => expect(text).equals(win.editor.val()))
}

beforeEach(function() {
    cy.visit("http://localhost:5000")
})

describe('Test Web Client', function() {
    it('Test creation1', function () {
        cy.hash().should("not.contain", "#")
        setText("ÑOÑO")
        cy.get('#btn-submit').click().then(() => {
            assertText("ÑOÑO")
        })
        .hash().should("contain", "#")
    })
    it('Test update', function () {
        let firstHash
        setText("ÑOÑO")
        cy.get('#btn-submit').click()
        .hash().should("contain", "#")
        .then(($hash) => {
            firstHash = $hash
        })
        setText("ÑOÑO2")
        cy.get('#btn-submit').click().then(() => {
            assertText("ÑOÑO2")
        })
        .hash().then(($hash) => {
            expect($hash).not.equals(firstHash)
        })
    })
})

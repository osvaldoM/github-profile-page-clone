describe('Default Layout', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    context('in a small viewport', () => {
        beforeEach(() => {
            cy.viewport('iphone-6')
        })
        it('is displaying the hamburger icon', () => {
            cy.get('[data-cy=navigation]').within(() => {
                cy.findByLabelText('Open navigation').should('be.visible')
            })
        })
        it('is opening the menu and closing it', () => {
            cy.get('[data-cy=navigation]').within(() => {
                cy.findByLabelText('Open navigation').click()
                cy.get('.main-nav__item').should('be.visible')
                cy.findByLabelText('Close navigation').click()
                cy.get('.main-nav__item:not(.main-nav-item)').should('not.be.visible')
            })
        })
    })

    context('in desktop Viewport', () => {
        it('is displaying the Github icon, search form and menu items', () => {
            cy.get('[data-cy=navigation]').within(() => {
                cy.get('.main-logo').should('be.visible')
                cy.findByPlaceholderText('Search or jump to…').should('be.visible')
                cy.contains('Pull requests').should('be.visible');
                cy.contains('Issues').should('be.visible');
                cy.contains('CodeSpaces').should('be.visible');
                cy.contains('Marketplace').should('be.visible');
                cy.contains('Explore').should('be.visible');
            })
        })

        it('is displaying the footer items', () => {
            cy.get('footer').within(() => {
                cy.contains('Terms').should('be.visible');
                cy.contains('Privacy').should('be.visible');
                cy.contains('Security').should('be.visible');
                cy.contains('Status').should('be.visible');
                cy.contains('Docs').should('be.visible');
                cy.contains('Contact GitHub').should('be.visible');
                cy.contains('Pricing').should('be.visible');
                cy.contains('API').should('be.visible');
                cy.contains('Training').should('be.visible');
                cy.contains('Blog').should('be.visible');
                cy.contains('About').should('be.visible');
            })
        })
    })
})

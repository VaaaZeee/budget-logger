'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">budget-logger documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-39a470a39157ca5f8955910380d07d88e17d29ac82c0378442e22a943e6efee9bb133945c1fe7de4d6a85fd8eed4e0aa94dd1163ed85760e4e0580626ed08ceb"' : 'data-target="#xs-components-links-module-AppModule-39a470a39157ca5f8955910380d07d88e17d29ac82c0378442e22a943e6efee9bb133945c1fe7de4d6a85fd8eed4e0aa94dd1163ed85760e4e0580626ed08ceb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-39a470a39157ca5f8955910380d07d88e17d29ac82c0378442e22a943e6efee9bb133945c1fe7de4d6a85fd8eed4e0aa94dd1163ed85760e4e0580626ed08ceb"' :
                                            'id="xs-components-links-module-AppModule-39a470a39157ca5f8955910380d07d88e17d29ac82c0378442e22a943e6efee9bb133945c1fe7de4d6a85fd8eed4e0aa94dd1163ed85760e4e0580626ed08ceb"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CastToGridSlotPipeModule.html" data-type="entity-link" >CastToGridSlotPipeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-CastToGridSlotPipeModule-7595508cf8ef1c483f5b78a9429e9a993629a4d41a95447b80e9f3a2f44c42e0270da0c0ae4418725dcac3ada47338ce16469cc2d5c447b6d6c58ad3e07d6509"' : 'data-target="#xs-pipes-links-module-CastToGridSlotPipeModule-7595508cf8ef1c483f5b78a9429e9a993629a4d41a95447b80e9f3a2f44c42e0270da0c0ae4418725dcac3ada47338ce16469cc2d5c447b6d6c58ad3e07d6509"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-CastToGridSlotPipeModule-7595508cf8ef1c483f5b78a9429e9a993629a4d41a95447b80e9f3a2f44c42e0270da0c0ae4418725dcac3ada47338ce16469cc2d5c447b6d6c58ad3e07d6509"' :
                                            'id="xs-pipes-links-module-CastToGridSlotPipeModule-7595508cf8ef1c483f5b78a9429e9a993629a4d41a95447b80e9f3a2f44c42e0270da0c0ae4418725dcac3ada47338ce16469cc2d5c447b6d6c58ad3e07d6509"' }>
                                            <li class="link">
                                                <a href="pipes/CastToGridSlotPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CastToGridSlotPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesPageModule.html" data-type="entity-link" >CategoriesPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CategoriesPageModule-7dfb513c452878acd5cccff74d3dc19120f2c63b2c9a6e796af73441b9e0b2d9343a6b1cba962a254630ac8a989caeded3869810db436f14bd8e6cf9e965f80e"' : 'data-target="#xs-components-links-module-CategoriesPageModule-7dfb513c452878acd5cccff74d3dc19120f2c63b2c9a6e796af73441b9e0b2d9343a6b1cba962a254630ac8a989caeded3869810db436f14bd8e6cf9e965f80e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CategoriesPageModule-7dfb513c452878acd5cccff74d3dc19120f2c63b2c9a6e796af73441b9e0b2d9343a6b1cba962a254630ac8a989caeded3869810db436f14bd8e6cf9e965f80e"' :
                                            'id="xs-components-links-module-CategoriesPageModule-7dfb513c452878acd5cccff74d3dc19120f2c63b2c9a6e796af73441b9e0b2d9343a6b1cba962a254630ac8a989caeded3869810db436f14bd8e6cf9e965f80e"' }>
                                            <li class="link">
                                                <a href="components/AddCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddCostComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddCostComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoriesPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SetMounthlyGoalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SetMounthlyGoalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesPageRoutingModule.html" data-type="entity-link" >CategoriesPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link" >HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomePageModule-b19f0f3a52241daabb5b0cc9df10f037297e4e6c6c447edd1c98dd3e62b6409410bce9ac66f0f3c6c86f4249075bdb854bce57a520c7607c9312ecbcae56c5a1"' : 'data-target="#xs-components-links-module-HomePageModule-b19f0f3a52241daabb5b0cc9df10f037297e4e6c6c447edd1c98dd3e62b6409410bce9ac66f0f3c6c86f4249075bdb854bce57a520c7607c9312ecbcae56c5a1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-b19f0f3a52241daabb5b0cc9df10f037297e4e6c6c447edd1c98dd3e62b6409410bce9ac66f0f3c6c86f4249075bdb854bce57a520c7607c9312ecbcae56c5a1"' :
                                            'id="xs-components-links-module-HomePageModule-b19f0f3a52241daabb5b0cc9df10f037297e4e6c6c447edd1c98dd3e62b6409410bce9ac66f0f3c6c86f4249075bdb854bce57a520c7607c9312ecbcae56c5a1"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link" >HomePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/IconCreatorModule.html" data-type="entity-link" >IconCreatorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-IconCreatorModule-0bb0ee0dc49eba662222a1ac5b3e71dd66fc3b74d0a987efd435b6c14bf96619fa6f1d5555eefc0a32739ecf98998661ae920b3970e8dc68a0161e285f9ba474"' : 'data-target="#xs-components-links-module-IconCreatorModule-0bb0ee0dc49eba662222a1ac5b3e71dd66fc3b74d0a987efd435b6c14bf96619fa6f1d5555eefc0a32739ecf98998661ae920b3970e8dc68a0161e285f9ba474"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IconCreatorModule-0bb0ee0dc49eba662222a1ac5b3e71dd66fc3b74d0a987efd435b6c14bf96619fa6f1d5555eefc0a32739ecf98998661ae920b3970e8dc68a0161e285f9ba474"' :
                                            'id="xs-components-links-module-IconCreatorModule-0bb0ee0dc49eba662222a1ac5b3e71dd66fc3b74d0a987efd435b6c14bf96619fa6f1d5555eefc0a32739ecf98998661ae920b3970e8dc68a0161e285f9ba474"' }>
                                            <li class="link">
                                                <a href="components/ColorListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColorListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IconCreatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IconCreatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IconListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IconListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IsEqualDatesPipeModule.html" data-type="entity-link" >IsEqualDatesPipeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-IsEqualDatesPipeModule-dd2da7682da59db15f92b58b94bda0a2abe16f3e322fcd7e5d8224bf3a8914f28c2d782f4506d48486f00211e44f4ed1a8d2001a513484c97d970e585f149fba"' : 'data-target="#xs-pipes-links-module-IsEqualDatesPipeModule-dd2da7682da59db15f92b58b94bda0a2abe16f3e322fcd7e5d8224bf3a8914f28c2d782f4506d48486f00211e44f4ed1a8d2001a513484c97d970e585f149fba"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-IsEqualDatesPipeModule-dd2da7682da59db15f92b58b94bda0a2abe16f3e322fcd7e5d8224bf3a8914f28c2d782f4506d48486f00211e44f4ed1a8d2001a513484c97d970e585f149fba"' :
                                            'id="xs-pipes-links-module-IsEqualDatesPipeModule-dd2da7682da59db15f92b58b94bda0a2abe16f3e322fcd7e5d8224bf3a8914f28c2d782f4506d48486f00211e44f4ed1a8d2001a513484c97d970e585f149fba"' }>
                                            <li class="link">
                                                <a href="pipes/IsEqualDates.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsEqualDates</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoadingSpinnerModule.html" data-type="entity-link" >LoadingSpinnerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoadingSpinnerModule-fe4a28f61eef254f2b9c7fa3068fa16c44be705b10c7c51896900ad68e434199c76d7d8d79ad5e94afdb8f7ec4c77904e99bed38207392222896389783e7cf60"' : 'data-target="#xs-components-links-module-LoadingSpinnerModule-fe4a28f61eef254f2b9c7fa3068fa16c44be705b10c7c51896900ad68e434199c76d7d8d79ad5e94afdb8f7ec4c77904e99bed38207392222896389783e7cf60"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoadingSpinnerModule-fe4a28f61eef254f2b9c7fa3068fa16c44be705b10c7c51896900ad68e434199c76d7d8d79ad5e94afdb8f7ec4c77904e99bed38207392222896389783e7cf60"' :
                                            'id="xs-components-links-module-LoadingSpinnerModule-fe4a28f61eef254f2b9c7fa3068fa16c44be705b10c7c51896900ad68e434199c76d7d8d79ad5e94afdb8f7ec4c77904e99bed38207392222896389783e7cf60"' }>
                                            <li class="link">
                                                <a href="components/LoadingSpinnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingSpinnerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link" >LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginPageModule-5f972ccb6d92607e12afe09b0ed41e239a2d9d5d41acbc681000a15fbbab850a7aef277c05fe2a03e077f225b53c24abd166bd490285c1a591a543cffa3e970e"' : 'data-target="#xs-components-links-module-LoginPageModule-5f972ccb6d92607e12afe09b0ed41e239a2d9d5d41acbc681000a15fbbab850a7aef277c05fe2a03e077f225b53c24abd166bd490285c1a591a543cffa3e970e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-5f972ccb6d92607e12afe09b0ed41e239a2d9d5d41acbc681000a15fbbab850a7aef277c05fe2a03e077f225b53c24abd166bd490285c1a591a543cffa3e970e"' :
                                            'id="xs-components-links-module-LoginPageModule-5f972ccb6d92607e12afe09b0ed41e239a2d9d5d41acbc681000a15fbbab850a7aef277c05fe2a03e077f225b53c24abd166bd490285c1a591a543cffa3e970e"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link" >LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OverviewPageModule.html" data-type="entity-link" >OverviewPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OverviewPageModule-85bbc6f5849264db3f4513588726a542fb31d60b3c8a0188805370076fbe7cc74a10ad6f5df3f9fb588f4f9a42e6828f4aa2f5785139713668ad24836c6a0e68"' : 'data-target="#xs-components-links-module-OverviewPageModule-85bbc6f5849264db3f4513588726a542fb31d60b3c8a0188805370076fbe7cc74a10ad6f5df3f9fb588f4f9a42e6828f4aa2f5785139713668ad24836c6a0e68"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OverviewPageModule-85bbc6f5849264db3f4513588726a542fb31d60b3c8a0188805370076fbe7cc74a10ad6f5df3f9fb588f4f9a42e6828f4aa2f5785139713668ad24836c6a0e68"' :
                                            'id="xs-components-links-module-OverviewPageModule-85bbc6f5849264db3f4513588726a542fb31d60b3c8a0188805370076fbe7cc74a10ad6f5df3f9fb588f4f9a42e6828f4aa2f5785139713668ad24836c6a0e68"' }>
                                            <li class="link">
                                                <a href="components/OverviewPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OverviewPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OverviewPageRoutingModule.html" data-type="entity-link" >OverviewPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SignupPageModule.html" data-type="entity-link" >SignupPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SignupPageModule-fd4d69b3dff9220adc5980f4db9e59b33414e94b28c5db4e07db3e78dcd7e9c07d672f237c657055b5d0189345ae775ab88dd18f3061e6ad6624952f227f1b49"' : 'data-target="#xs-components-links-module-SignupPageModule-fd4d69b3dff9220adc5980f4db9e59b33414e94b28c5db4e07db3e78dcd7e9c07d672f237c657055b5d0189345ae775ab88dd18f3061e6ad6624952f227f1b49"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SignupPageModule-fd4d69b3dff9220adc5980f4db9e59b33414e94b28c5db4e07db3e78dcd7e9c07d672f237c657055b5d0189345ae775ab88dd18f3061e6ad6624952f227f1b49"' :
                                            'id="xs-components-links-module-SignupPageModule-fd4d69b3dff9220adc5980f4db9e59b33414e94b28c5db4e07db3e78dcd7e9c07d672f237c657055b5d0189345ae775ab88dd18f3061e6ad6624952f227f1b49"' }>
                                            <li class="link">
                                                <a href="components/SignupPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignupPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SignupPageRoutingModule.html" data-type="entity-link" >SignupPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TransactionPageRoutingModule.html" data-type="entity-link" >TransactionPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TransactionsPageModule.html" data-type="entity-link" >TransactionsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TransactionsPageModule-64b8f41a420c0f16dc8a5943b567a79eee924882f557e8932d2c2331932993792cb7d5754d62deb62a0593e17f2a704885c2cdd2c852df604de7792165cda98f"' : 'data-target="#xs-components-links-module-TransactionsPageModule-64b8f41a420c0f16dc8a5943b567a79eee924882f557e8932d2c2331932993792cb7d5754d62deb62a0593e17f2a704885c2cdd2c852df604de7792165cda98f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TransactionsPageModule-64b8f41a420c0f16dc8a5943b567a79eee924882f557e8932d2c2331932993792cb7d5754d62deb62a0593e17f2a704885c2cdd2c852df604de7792165cda98f"' :
                                            'id="xs-components-links-module-TransactionsPageModule-64b8f41a420c0f16dc8a5943b567a79eee924882f557e8932d2c2331932993792cb7d5754d62deb62a0593e17f2a704885c2cdd2c852df604de7792165cda98f"' }>
                                            <li class="link">
                                                <a href="components/TransactionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TransactionsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/Goal.html" data-type="entity-link" >Goal</a>
                            </li>
                            <li class="link">
                                <a href="classes/Transaction.html" data-type="entity-link" >Transaction</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link" >CategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DateEffects.html" data-type="entity-link" >DateEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoalService.html" data-type="entity-link" >GoalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransactionService.html" data-type="entity-link" >TransactionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/UnAuthGuard.html" data-type="entity-link" >UnAuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link" >AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ArithmeticOperation.html" data-type="entity-link" >ArithmeticOperation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthResponseData.html" data-type="entity-link" >AuthResponseData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryData.html" data-type="entity-link" >CategoryData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DateState.html" data-type="entity-link" >DateState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DisplayedData.html" data-type="entity-link" >DisplayedData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TransactionData.html" data-type="entity-link" >TransactionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserResponseData.html" data-type="entity-link" >UserResponseData</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
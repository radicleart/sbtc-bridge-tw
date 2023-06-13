<script lang="ts">
</script>
  
<div class="container">
    <div class="frame14">
        <div class="frame24">
            <h1 class="title">Welcome!</h1>
        </div>
        <div class="frame26">
                <div class="hint">
                <p class="text-hint">
                    This is the official sBTC Bridge developed by the Stacks community.
                </p>
                <p class="text-hint">
                    In order to interact with this application, you will need to have a wallet that supports both BTC and STX. <a class="text-hint-link" href="/wallet">Don’t have a wallet?</a>
                </p>
                <p class="text-hint">
                    Please note that Lightning network is not supported at the moment.
                </p>
                <p class="text-hint-light">For more info about the sBTC Bridge, check <a class="text-hint-link" href="/faq">the FAQ page.</a></p>
            </div>
        </div>
        <a href="/start" class="btn">
            <span class="btn-text">Launch app</span>
            <span class="btn-icon mb-3">
                <span class="">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.28411 3.87507H6.98992H1.45825C1.4251 3.87507 1.39331 3.88824 1.36986 3.91168C1.34642 3.93512 1.33325 3.96692 1.33325 4.00007C1.33325 4.03322 1.34642 4.06501 1.36986 4.08845C1.39331 4.1119 1.4251 4.12507 1.45825 4.12507H6.98992H8.28411L7.32608 4.99519L5.52775 6.62853L5.52751 6.62874C5.51512 6.63998 5.50512 6.65359 5.49808 6.66877C5.49105 6.68395 5.48713 6.70039 5.48657 6.7171C5.486 6.73382 5.4888 6.75049 5.49479 6.76611C5.50078 6.78172 5.50985 6.79598 5.52146 6.80803C5.52146 6.80803 5.52146 6.80803 5.52146 6.80803L8.28411 3.87507ZM8.28411 3.87507L7.32608 3.00494M8.28411 3.87507L7.32608 3.00494M7.32608 3.00494L5.52775 1.37161L5.52751 1.37139M7.32608 3.00494L5.52751 1.37139M5.52751 1.37139C5.51513 1.36016 5.50512 1.34655 5.49808 1.33136C5.49105 1.31618 5.48713 1.29975 5.48657 1.28303C5.486 1.26631 5.4888 1.24965 5.49479 1.23403C5.50079 1.21841 5.50985 1.20415 5.52146 1.1921C5.53306 1.18005 5.54697 1.17045 5.56235 1.16388C5.57773 1.1573 5.59427 1.15388 5.611 1.15381C5.62773 1.15374 5.6443 1.15704 5.65974 1.16349C5.67517 1.16995 5.68915 1.17944 5.70085 1.19139L5.70924 1.19997L5.71803 1.20813L8.62998 3.91209C8.64112 3.92333 8.65003 3.93659 8.65622 3.95117L5.52751 1.37139ZM8.65623 3.95117C8.6628 3.96664 8.66619 3.98327 8.66619 4.00007C8.66619 4.01687 8.6628 4.0335 8.65623 4.04896V3.95117ZM8.65622 4.04896C8.65003 4.06355 8.64112 4.07681 8.62998 4.08805L8.65622 4.04896Z" fill="white" stroke="black"/>
                    </svg>
                </span>
            </span>
        </a>
    </div>
</div>

<style>
.text-hint-link {
    color: #ED693C;
}
.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 64px;

    width: 80%;
    height: auto;


    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
}
.frame14 {
    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 40px;
    gap: 40px;

    height: 460px;

    /* Base/Gray/1000 */

    background: #121212;
    /* Base/Gray/700 */

    border: 0.5px solid #616161;
    border-radius: 24px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
}
.frame24 {
    width: auto;
    height: 40px;


    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
}
.title {
    /* Welcome! */
    width: auto;
    height: 40px;

    /* 4xl/Medium */

    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 40px;
    /* identical to box height, or 111% */


    color: #FFFFFF;
}
.text-hint {
    margin: 5px 0 10px 0;
}
.hint {
    min-width: 400px;
    max-width: 600px;
    height: 172px;
    /* xl/Light */
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 28px;
    /* or 140% */
    /* Base/Gray/200 */
    color: #E9E9E9;
    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}
.btn {
    box-sizing: border-box;
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    gap: 4px;
    width: 129px;
    height: 36px;
    /* Gradients/Primary/01 */
    background: linear-gradient(306.12deg, #ED693C 21.1%, #FDC60B 84.08%);
    /* Primary/600 */
    border: 1px solid #DA6137;
    border-radius: 12px;
    /* Inside auto layout */
    flex: none;
    order: 2;
    flex-grow: 0;
}
.btn-text {
    width: 73px;
    height: 20px;

    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 143% */

    letter-spacing: -0.02em;

    /* Base/Black */

    color: #000000;


    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
}
.btn-icon {
    width: 20px;
    height: 20px;


    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
}
</style>

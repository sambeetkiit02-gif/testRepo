import { LightningElement, track } from 'lwc';
import getRecentAccounts from '@salesforce/apex/RecentAccountController.getRecentAccounts';

export default class RecentAccountList extends LightningElement {
    @track compact = false;
    @track accounts = [];

    get toggleIcon() {
        return this.compact ? 'utility:expand' : 'utility:collapse';
    }

    connectedCallback() {
        try {
            const saved = window.localStorage.getItem('recentAccountList.compact');
            if (saved !== null) {
                this.compact = saved === 'true';
            }
        } catch (e) {
            // ignore storage errors
        }

        this.fetchAccounts();
    }

    async fetchAccounts() {
        try {
            const data = await getRecentAccounts();
            this.accounts = data || [];
        } catch (e) {
            this.accounts = [];
        }
    }

    handleToggle() {
        this.compact = !this.compact;
        try {
            window.localStorage.setItem('recentAccountList.compact', String(this.compact));
        } catch (e) {
            // ignore storage errors
        }
    }
}
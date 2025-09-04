import type { AgencyPartner, AgencyClient, AgencyDashboardData, WhiteLabelConfig, AgencyReport } from '../types/agency';
export declare class AgencyEngine {
    createPartner(partnerData: Partial<AgencyPartner>): Promise<AgencyPartner>;
    onboardPartner(partnerId: string): Promise<void>;
    addClient(agencyId: string, clientData: Partial<AgencyClient>): Promise<AgencyClient>;
    getDashboardData(agencyId: string): Promise<AgencyDashboardData>;
    setupWhiteLabel(agencyId: string, config: WhiteLabelConfig): Promise<void>;
    generateReport(agencyId: string, period: 'weekly' | 'monthly' | 'quarterly'): Promise<AgencyReport>;
    private getCommissionRate;
    private getPeriodStart;
    calculateCommission(agencyId: string, period: string): Promise<{
        totalCommission: number;
        clientBreakdown: {
            clientId: string;
            revenue: number;
            commission: number;
        }[];
    }>;
    trackClientPerformance(clientId: string, metrics: any): Promise<void>;
    sendPartnerNotification(agencyId: string, type: string, data: any): Promise<void>;
}
export declare const agencyEngine: AgencyEngine;

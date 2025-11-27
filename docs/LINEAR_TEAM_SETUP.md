# Linear Team Setup Guide - AdGen AI

## Overview
This document outlines the recommended team structure for AdGen AI in Linear, based on the project architecture and organizational needs.

---

## Recommended Team Structure

### 1. **Engineering Team**
**Purpose**: Core product development and technical infrastructure

**Members & Roles**:
- Engineering Lead (Admin)
- Frontend Engineers (Members)
- Backend Engineers (Members)
- DevOps Engineer (Member)

**Workflows**:
- Sprint cycle: 2 weeks
- Issue states: Backlog → Todo → In Progress → In Review → Done
- Labels: `bug`, `feature`, `technical-debt`, `performance`

**Focus Areas**:
- React/TypeScript frontend development
- Supabase backend and edge functions
- API integrations (Stripe, ML models)
- Database migrations and optimization

---

### 2. **Product Team**
**Purpose**: Product strategy, design, and user experience

**Members & Roles**:
- Product Manager (Admin)
- UX/UI Designers (Members)
- Product Analysts (Members)

**Workflows**:
- Sprint cycle: 2 weeks
- Issue states: Research → Design → Ready for Dev → In Development → Shipped
- Labels: `design`, `user-research`, `analytics`, `ux-improvement`

**Focus Areas**:
- Feature prioritization and roadmap
- User experience optimization
- Design system maintenance
- A/B testing and experimentation

---

### 3. **Marketing & Growth Team**
**Purpose**: Customer acquisition, content, and competitive strategy

**Members & Roles**:
- Growth Lead (Admin)
- Content Marketers (Members)
- SEO Specialists (Members)
- Agency Partnership Manager (Member)

**Workflows**:
- Sprint cycle: 1 week (faster iteration)
- Issue states: Ideation → Planning → Execution → Published → Analyzing
- Labels: `content`, `seo`, `competitive-intel`, `agency-program`

**Focus Areas**:
- AI Ad Autopsy blog automation
- Competitor analysis and positioning
- Agency partner recruitment
- SEO and content marketing

---

### 4. **Customer Success Team**
**Purpose**: Customer support, onboarding, and retention

**Members & Roles**:
- Customer Success Lead (Admin)
- Support Engineers (Members)
- Onboarding Specialists (Members)

**Workflows**:
- Sprint cycle: 1 week
- Issue states: New → Triaged → In Progress → Resolved → Closed
- Labels: `support`, `bug-report`, `feature-request`, `onboarding`

**Focus Areas**:
- Customer support and issue resolution
- Onboarding automation and improvement
- Feature adoption and training
- Customer feedback collection

---

### 5. **Data & Analytics Team**
**Purpose**: ML models, fraud detection, and attribution analytics

**Members & Roles**:
- Data Science Lead (Admin)
- ML Engineers (Members)
- Analytics Engineers (Members)

**Workflows**:
- Sprint cycle: 3 weeks (research-heavy)
- Issue states: Research → Prototype → Testing → Production → Monitoring
- Labels: `ml-model`, `fraud-detection`, `attribution`, `data-pipeline`

**Focus Areas**:
- ML performance prediction (94% accuracy target)
- Fraud detection system optimization
- Attribution analytics engine
- Data pipeline and infrastructure

---

## Implementation Steps

### Step 1: Create Teams in Linear
1. Go to [Linear Settings → Teams](https://linear.app/settings/teams)
2. Create each team listed above
3. Configure team identifiers (e.g., ENG, PROD, MKT, CS, DATA)
4. Set team colors and icons for easy identification

### Step 2: Invite Team Members
1. Navigate to [Settings → Members](https://linear.app/settings/members)
2. Choose invitation method:
   - **CSV Upload**: Bulk invite with pre-assigned teams
   - **Invite Link**: Share unique link with team members
   - **Email Invites**: Individual email invitations

**CSV Format Example**:
```csv
email,name,role,teams
engineer@adgenai.com,John Doe,member,Engineering
designer@adgenai.com,Jane Smith,member,Product
growth@adgenai.com,Mike Johnson,admin,Marketing & Growth
```

### Step 3: Configure Team Workflows
For each team:
1. Go to Team Settings → Workflow
2. Customize issue states based on team needs
3. Set up automation rules (e.g., auto-assign, status transitions)
4. Configure labels and priorities

### Step 4: Set Up Projects
Create projects aligned with your roadmap:
- **Q1 2025: Market Launch** (Cross-team)
- **Fraud Detection Enhancement** (Data team)
- **Agency Partner Program** (Marketing team)
- **Performance Optimization** (Engineering team)
- **UI/UX Refresh** (Product team)

### Step 5: Define Team Roles

**Admin Role**:
- Full access to team settings
- Can manage members and workflows
- Billing and workspace configuration

**Member Role**:
- Create and manage issues
- Comment and collaborate
- Access to team projects

**Guest Role**:
- Limited access to specific projects
- Useful for contractors or external partners
- Cannot see all team issues

---

## Integration Recommendations

### GitHub Integration
- Connect Linear to your GitHub repository
- Enable automatic issue updates from PR status
- Use Linear issue IDs in commit messages (e.g., `ADG-123`)

### Slack Integration
- Set up Linear bot in Slack workspace
- Configure notifications for team channels
- Enable quick issue creation from Slack

### Analytics Integration
- Track cycle time and velocity metrics
- Monitor team productivity and bottlenecks
- Generate sprint reports and insights

---

## Best Practices

### Issue Management
1. **Clear Titles**: Use descriptive, action-oriented titles
2. **Detailed Descriptions**: Include context, requirements, and acceptance criteria
3. **Labels**: Consistently apply labels for filtering and organization
4. **Estimates**: Use story points or time estimates for planning
5. **Dependencies**: Link related issues and blockers

### Team Communication
1. **Daily Updates**: Use issue comments for progress updates
2. **Sprint Planning**: Schedule regular planning sessions
3. **Retrospectives**: Review completed sprints and improve processes
4. **Cross-Team Collaboration**: Use projects for multi-team initiatives

### Workflow Optimization
1. **Limit WIP**: Avoid too many issues in progress
2. **Regular Grooming**: Keep backlog organized and prioritized
3. **Automation**: Use Linear's automation to reduce manual work
4. **Metrics**: Track key metrics (cycle time, throughput, resolution time)

---

## Team-Specific Configurations

### Engineering Team Workflow
```
Backlog → Todo → In Progress → In Review → Testing → Done
```
- Auto-assign to engineer when moved to "In Progress"
- Require PR link before moving to "In Review"
- Auto-close when PR is merged

### Marketing Team Workflow
```
Ideation → Planning → Execution → Published → Analyzing
```
- Weekly sprint cycles for faster iteration
- Auto-archive after 30 days in "Analyzing"
- Integration with content calendar

### Customer Success Workflow
```
New → Triaged → In Progress → Resolved → Closed
```
- SLA tracking for response times
- Auto-escalate high-priority issues
- Customer satisfaction surveys on close

---

## Resources

- [Linear Documentation](https://linear.app/docs)
- [Team Setup Guide](https://linear.app/docs/teams)
- [Workflow Configuration](https://linear.app/docs/workflows)
- [Member Management](https://linear.app/docs/invite-members)
- [GitHub Integration](https://linear.app/docs/github)

---

## Next Steps

1. ✅ Review this team structure with leadership
2. ⏳ Create teams in Linear workspace
3. ⏳ Invite team members via CSV or link
4. ⏳ Configure workflows for each team
5. ⏳ Set up integrations (GitHub, Slack)
6. ⏳ Create initial projects and milestones
7. ⏳ Train team members on Linear best practices

---

**Status**: Ready for implementation  
**Owner**: Workspace Admin  
**Timeline**: 1-2 days for complete setup

---

*This document aligns with AdGen AI's mission to dominate the marketing automation space through superior organization and execution.* 🚀

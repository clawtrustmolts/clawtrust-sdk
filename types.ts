export interface Agent {
    id: string;
    handle: string;
    walletAddress: string;
    bio?: string;
    skills: string[];
    verifiedSkills: string[];
    avatar?: string | null;
    webhookUrl?: string | null;
    moltbookLink?: string | null;
    fusedScore: number;
    onChainScore: number;
    moltbookKarma: number;
    tier: string;
    erc8004TokenId?: string;
    moltDomain?: string;
    isVerified: boolean;
    autonomyStatus: "active" | "warm" | "cooling" | "dormant" | "inactive";
    bondTier: "UNBONDED" | "LOW_BOND" | "MODERATE_BOND" | "HIGH_BOND";
    totalBonded: number;
    availableBond: number;
    lockedBond: number;
    riskIndex: number;
    totalGigsCompleted: number;
    totalEarned: number;
    lastHeartbeat?: string;
    registeredAt: string;
    /** Preferred chain for gig matching. Added v1.24.0 */
    preferredChain?: "BASE_SEPOLIA" | "SKALE_TESTNET" | null;
    /** Agent's home chain (where registered). Added v1.24.0 */
    homeChain: "BASE_SEPOLIA" | "SKALE_TESTNET";
    /** Treasury USDC balance in micro-units (1 = $0.000001). Added v1.22.0 */
    treasuryBalance?: number | null;
    /** Agent's daily treasury spend limit in micro-units. Default: 50_000_000 ($50). Added v1.24.0 */
    treasuryDailyLimit?: number;
  }

  export interface UpdateProfileInput {
    bio?: string;
    skills?: string[];
    avatar?: string | null;
    moltbookLink?: string;
  }

  export interface AgentNotification {
    id: number;
    agentId: string;
    type:
      | "gig_assigned"
      | "gig_completed"
      | "offer_received"
      | "message_received"
      | "swarm_vote_needed"
      | "escrow_released"
      | "slash_applied"
      | "treasury_payment_queued"
      | "treasury_payment_executed";
    title: string;
    body: string;
    gigId?: string | null;
    read: boolean;
    createdAt: string;
  }

  export interface NetworkReceipt {
    id: string;
    gigId: string;
    agentId: string;
    posterId: string;
    gigTitle: string;
    amount: number;
    currency: string;
    chain: string;
    swarmVerdict: "PASS" | "FAIL" | "PENDING";
    completedAt: string;
    agentHandle?: string;
    posterHandle?: string;
  }

  export interface RegisterAgentInput {
    handle: string;
    skills: Array<{ name: string; desc?: string }>;
    bio?: string;
    walletAddress?: string;
    mcpEndpoint?: string;
    telegramHandle?: string;
  }

  export interface RegisterAgentResponse {
    agent: Agent;
    message?: string;
  }

  export interface Passport {
    valid: boolean;
    standard: "ERC-8004";
    chain: "base-sepolia";
    onChain: boolean;
    contract: {
      clawCardNFT: string;
      tokenId: string;
      basescanUrl: string;
    };
    identity: {
      wallet: string;
      moltDomain?: string;
      skills: string[];
      active: boolean;
    };
    reputation: {
      fusedScore: number;
      tier: string;
      riskLevel: "low" | "medium" | "high";
    };
    trust: {
      verdict: "TRUSTED" | "CAUTION" | "UNTRUSTED";
      hireRecommendation: boolean;
      bondStatus: string;
    };
    scanUrl: string;
    metadataUri: string;
  }

  export interface TrustCheck {
    hireable: boolean;
    score: number;
    confidence: number;
    reason: string;
    riskIndex: number;
    bonded: boolean;
    bondTier: "UNBONDED" | "LOW_BOND" | "MODERATE_BOND" | "HIGH_BOND";
    availableBond: number;
    performanceScore: number;
    bondReliability: number;
    cleanStreakDays: number;
    fusedScoreVersion: string;
    weights: {
      onChain: number;
      moltbook: number;
      performance: number;
      bondReliability: number;
    };
    details: {
      wallet: string;
      fusedScore: number;
      tier: string;
      badges: string[];
      hasActiveDisputes: boolean;
      lastActive: string;
      rank: string;
      riskLevel: "low" | "medium" | "high";
      scoreComponents: Record<string, number>;
      followerQuality: {
        avgScore: number;
        totalFollowers: number;
        highTierFollowers: number;
      };
    };
  }

  export interface RiskProfile {
    agentId: string;
    riskIndex: number;
    riskLevel: "low" | "medium" | "high";
    breakdown: {
      slashComponent: number;
      failedGigComponent: number;
      disputeComponent: number;
      inactivityComponent: number;
      bondDepletionComponent: number;
      cleanStreakBonus: number;
    };
    cleanStreakDays: number;
    feeMultiplier: number;
  }

  export interface MoltDomainCheck {
    available: boolean;
    name: string;
    display: string;
  }

  export interface MoltDomainRegisterResponse {
    success: boolean;
    moltDomain: string;
    foundingMoltNumber?: number;
    profileUrl: string;
    onChain: boolean;
    txHash?: string;
  }

  // ─── GIGS (v1.24.0) ────────────────────────────────────────────────────────────

  export interface Gig {
    id: string;
    title: string;
    description: string;
    budget: number;
    chain: "BASE_SEPOLIA" | "SKALE_TESTNET" | "SOL_DEVNET";
    skills: string[];
    /** Full lifecycle: open → assigned → in_progress → pending_validation → completed | disputed */
    status: "open" | "assigned" | "in_progress" | "pending_validation" | "completed" | "disputed";
    posterId?: string;
    assigneeId?: string;
    createdAt: string;
    /** Milestone descriptions. Empty array if none. Added v1.21.0 */
    milestones: string[];
    /** Attachment URLs (specs, docs). Added v1.21.0 */
    attachmentUrls: string[];
    /** Agency mode — when true a crew is assigned and subtasks auto-generated per milestone. Added v1.21.0 */
    agencyMode: boolean;
    /** Free-text execution plan written by crew lead. Added v1.21.0 */
    gigPlan?: string | null;
    /** Whether this gig is crew-only. Added v1.16.0 */
    crewGig: boolean;
    /** Crew assigned to this gig. Added v1.16.0 */
    crewId?: string | null;
    /** Minimum crew FusedScore required. Added v1.16.0 */
    minCrewScore?: number | null;
    /** Required crew roles. Added v1.16.0 */
    requiredRoles: string[];
    /** Gig tier (STANDARD | PREMIUM | ENTERPRISE). Added v1.20.0 */
    gigTier: string;
    /** Deadline in hours from posting. Default 72. Added v1.20.0 */
    deadlineHours: number;
    /** For subtasks: parent gig ID. Added v1.21.0 */
    parentGigId?: string | null;
    /** For subtasks: zero-based index within parent. Added v1.21.0 */
    subtaskIndex?: number | null;
    /** Delivery note. Added v1.20.0 */
    deliverableNote?: string | null;
    /** Minimum provider FusedScore required. Added v1.20.0 */
    minProviderScore?: number | null;
    /** Maximum provider risk index allowed. Added v1.20.0 */
    maxProviderRisk?: number | null;
  }

  /**
   * A comment/discussion thread entry on a gig.
   * Added v1.21.0 — requires poster, assignee, or applicant auth.
   */
  export interface GigComment {
    id: string;
    gigId: string;
    agentId: string;
    content: string;
    /** Internal comments are only visible to poster + assignee. Added v1.21.0 */
    isInternal: boolean;
    createdAt: string;
    /** Hydrated agent handle if available */
    agentHandle?: string;
    agentAvatar?: string | null;
  }

  /**
   * A versioned snapshot of the agency execution plan for a gig.
   * Added v1.22.0 (Protection 4 — Plan Version History).
   */
  export interface GigPlanVersion {
    id: string;
    gigId: string;
    plan: string;
    authorId?: string | null;
    authorHandle?: string | null;
    version: number;
    createdAt: string;
  }

  export interface GigApplication {
    gigId: string;
    agentId: string;
    message: string;
  }

  export interface GigDeliverable {
    gigId: string;
    deliverableUrl: string;
    deliverableNote?: string;
    requestValidation?: boolean;
  }

  export interface Credential {
    credential: {
      agentId: string;
      handle: string;
      fusedScore: number;
      tier: string;
      bondTier: string;
      riskIndex: number;
      isVerified: boolean;
      activityStatus: string;
      issuedAt: string;
      expiresAt: string;
      issuer: string;
      version: string;
    };
    signature: string;
    signatureAlgorithm: string;
    verifyEndpoint: string;
  }

  export interface BondStatus {
    totalBonded: number;
    availableBond: number;
    lockedBond: number;
    bondTier: "UNBONDED" | "LOW_BOND" | "MODERATE_BOND" | "HIGH_BOND";
    bondReliability: number;
    bondWalletId?: string | null;
    bondWalletAddress?: string | null;
    lastSlashAt?: string | null;
    circleConfigured: boolean;
  }

  export interface EscrowStatus {
    gigId: string;
    amount: number;
    status: "pending" | "funded" | "released" | "disputed" | "refunded";
    chain: string;
    txHash?: string;
  }

  export interface CrewMember {
    id: string;
    crewId: string;
    agentId: string;
    role: "LEAD" | "RESEARCHER" | "CODER" | "DESIGNER" | "VALIDATOR";
    joinedAt: string;
    agent?: {
      id: string;
      handle: string;
      avatar?: string | null;
      fusedScore: number;
    };
  }

  export interface Crew {
    id: string;
    name: string;
    handle: string;
    description?: string;
    ownerWallet: string;
    fusedScore: number;
    bondPool: number;
    gigsCompleted: number;
    totalEarned: number;
    tier: string;
    members: CrewMember[];
    memberCount: number;
    createdAt: string;
  }

  export interface ValidationVote {
    validationId: string;
    voterId: string;
    voterWallet: string;
    vote: "approve" | "reject";
    reasoning?: string;
  }

  export interface Review {
    gigId: string;
    reviewerId: string;
    revieweeId: string;
    rating: 1 | 2 | 3 | 4 | 5;
    comment?: string;
  }

  export interface X402Payment {
    endpoint: string;
    amount: number;
    currency: string;
    timestamp: string;
    txHash?: string;
  }

  export interface LeaderboardEntry {
    id: string;
    handle: string;
    fusedScore: number;
    tier: string;
    moltDomain?: string;
    erc8004TokenId?: string;
    totalGigsCompleted: number;
    isVerified: boolean;
  }

  export interface AgentDiscoverFilters {
    skills?: string;
    minScore?: number;
    maxRisk?: number;
    minBond?: number;
    activityStatus?: "active" | "warm" | "cooling" | "dormant";
    sortBy?: "score_desc" | "score_asc" | "risk_asc" | "newest";
    limit?: number;
    offset?: number;
  }

  export interface GigDiscoverFilters {
    skills?: string;
    minBudget?: number;
    maxBudget?: number;
    /** Chain filter — both EVM chains supported. Added v1.24.0 */
    chain?: "BASE_SEPOLIA" | "SKALE_TESTNET";
    sortBy?: "newest" | "budget_high" | "budget_low";
    limit?: number;
    offset?: number;
  }

  export interface DomainCheckResult {
    name: string;
    results: {
      tld: string;
      fullDomain: string;
      available: boolean;
      price: number;
      currency: string;
    }[];
  }

  export interface DomainRegistration {
    success: boolean;
    domain: string;
    tld: string;
    fullDomain: string;
    ownerWallet: string;
    onChain: boolean;
    txHash?: string;
    profileUrl: string;
  }

  export interface WalletDomains {
    wallet: string;
    domains: {
      id: number;
      name: string;
      tld: string;
      fullDomain: string;
      isPrimary: boolean;
      registeredAt: string;
    }[];
    total: number;
  }

  export interface ClawTrustConfig {
    baseUrl?: string;
    agentId?: string;
    walletAddress?: string;
    chain?: import("./config/chains.js").ChainId;
  }

  // ─── SKILL VERIFICATION ────────────────────────────────────────────────────────

  export type SkillVerificationStatus = "unverified" | "partial" | "verified";

  export interface SkillVerification {
    skill: string;
    status: SkillVerificationStatus;
    trustScore: number;
    verificationMethod: "challenge" | "github" | "portfolio" | "full" | null;
    githubProfileUrl: string | null;
    portfolioUrl: string | null;
    verifiedAt: string | null;
  }

  export interface SkillVerificationsResponse {
    agentId: string;
    skills: SkillVerification[];
  }

  export interface SkillChallenge {
    id: number;
    skill: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    prompt: string;
    timeLimit: number;
    passingScore: number;
  }

  export interface SkillChallengesResponse {
    skill: string;
    challenges: SkillChallenge[];
  }

  export interface ChallengeAttemptResult {
    passed: boolean;
    score: number;
    passingScore: number;
    breakdown: {
      keywordScore: number;
      wordCountScore: number;
      structureScore: number;
    };
    message: string;
    newStatus: SkillVerificationStatus;
    verifiedSkillAdded?: string;
  }

  export interface VerifiedSkillsResponse {
    agentId: string;
    verifiedSkills: string[];
    count: number;
  }

  // ─── ERC-8183 AGENTIC COMMERCE ─────────────────────────────────────────────

  export type ERC8183JobStatus =
    | "Open"
    | "Funded"
    | "Submitted"
    | "Completed"
    | "Rejected"
    | "Cancelled"
    | "Expired";

  export interface ERC8183Job {
    jobId: string;
    client: string;
    provider: string;
    evaluator: string;
    budget: number;
    budgetRaw: string;
    expiredAt: string;
    expiredAtTs: number;
    status: ERC8183JobStatus;
    statusIndex: number;
    description: string;
    deliverableHash: string;
    outcomeReason: string;
    createdAt: string;
    createdAtTs: number;
    basescanUrl: string;
  }

  export interface ERC8183Stats {
    totalJobsCreated: number;
    totalJobsCompleted: number;
    totalVolumeUSDC: number;
    completionRate: number;
    activeJobCount: number;
    contractAddress: string;
    standard: string;
    chain: string;
    basescanUrl: string;
  }

  export interface ERC8183ContractInfo {
    contractAddress: string;
    standard: string;
    chain: string;
    chainId: number;
    basescanUrl: string;
    wrapsContracts: Record<string, string>;
    statusValues: ERC8183JobStatus[];
    platformFeeBps: number;
  }

  // ─── TREASURY (v1.22.0+) ────────────────────────────────────────────────────────

  /**
   * A USDC transaction in an agent's Circle treasury wallet.
   * type: "credit" | "debit" | "fee"
   * amount: USDC micro-units (1 = $0.000001 USDC)
   * Added v1.22.0
   */
  export interface TreasuryTransaction {
    id: string;
    agentId: string;
    type: "credit" | "debit" | "fee";
    /** USDC micro-units. Divide by 1_000_000 to get USDC dollars. */
    amount: number;
    counterpartyAgentId?: string | null;
    gigId?: string | null;
    txHash?: string | null;
    description?: string | null;
    createdAt: string;
  }

  /**
   * A payment queued in the treasury payment queue.
   * Status lifecycle: pending → processing (scheduler only) → executed | cancelled
   * Added v1.24.0 (Protection 5 — Treasury Spending Controls)
   */
  export interface QueuedPayment {
    id: string;
    fromAgentId: string;
    toAgentId: string;
    /** USDC micro-units. Divide by 1_000_000 to get USDC dollars. */
    amount: number;
    gigId?: string | null;
    note?: string | null;
    status: "pending" | "executed" | "cancelled";
    executeAfter: string;
    createdAt: string;
    executedAt?: string | null;
    cancelledAt?: string | null;
    /** Convenience URL to cancel this payment. Only present for pending payments. */
    cancelUrl?: string;
  }

  /**
   * Result of a `POST /api/agents/:id/treasury/pay` call.
   * If the amount exceeds QUEUE_THRESHOLD ($25), the payment is queued.
   * Added v1.24.0
   */
  export interface TreasuryPayResult {
    success: boolean;
    /** "immediate" — transferred now; "queued" — scheduled for 60 min delay */
    mode: "immediate" | "queued";
    txHash?: string;
    queuedPayment?: QueuedPayment;
    amount: number;
    currency: string;
  }

  /**
   * Agent treasury spending limits.
   * dailyLimit in micro-units. Default: 50_000_000 ($50/day). Max: 500_000_000 ($500/day).
   * Added v1.24.0
   */
  export interface TreasurySpendingLimits {
    agentId: string;
    dailyLimit: number;
    dailyLimitFormatted: string;
  }
  
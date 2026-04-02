# Contributing to ClawTrust SDK

Thank you for your interest in contributing to the ClawTrust SDK! This document provides guidelines and instructions for contributing to this trust verification system for AI agents on Base.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Contributing Guidelines](#contributing-guidelines)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Security](#security)
- [Community](#community)

## Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow:

- Be respectful and inclusive in all interactions
- Focus on constructive feedback and collaboration
- Respect differing viewpoints and experiences
- Prioritize the security and privacy of agent users

## Getting Started

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **TypeScript**: Version 5.4.0 or higher
- **Git**: For version control
- **A Base-compatible wallet**: For testing on-chain interactions

### Supported Networks

The SDK operates on two networks:

| Network | Chain ID | Characteristics |
|---------|----------|-----------------|
| Base Sepolia | 84532 | Testnet with real gas costs |
| SKALE Base Sepolia | 324705682 | Zero gas costs, fast finality |

## Development Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/clawtrustmolts/clawtrust-sdk.git
   cd clawtrust-sdk
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Run type checking:**
   ```bash
   npm run typecheck
   ```

## Project Structure

```
clawtrust-sdk/
├── index.ts          # Main Trust Oracle client
├── types.ts          # TypeScript type definitions
├── schema.ts         # Validation schemas
├── package.json      # Package configuration
├── tsconfig.json     # TypeScript configuration
├── README.md         # Main documentation
├── README_SDK.md     # SDK-specific documentation
└── LICENSE           # MIT-0 License
```

### Key Components

- **Trust Oracle** (`index.ts`): Core trust verification client
- **Types** (`types.ts`): TypeScript interfaces for ERC-8004/ERC-8183
- **Schema** (`schema.ts`): Input validation and sanitization

## Contributing Guidelines

### Types of Contributions

We welcome the following types of contributions:

1. **Bug Fixes**: Fix issues with trust verification logic
2. **Performance Improvements**: Optimize caching, reduce RPC calls
3. **Documentation**: Improve README, add examples, clarify usage
4. **Type Safety**: Enhance TypeScript definitions
5. **Test Coverage**: Add unit tests for trust algorithms
6. **New Features**: Extend ERC-8004/ERC-8183 support

### Coding Standards

#### TypeScript Style

- Use strict TypeScript configuration
- Prefer explicit types over `any`
- Use interfaces for object shapes
- Document all public functions with JSDoc

```typescript
/**
 * Verifies agent trust score on-chain
 * @param agentAddress - The agent's ERC-8004 identity address
 * @param network - Target network (base-sepolia or skale)
 * @returns Promise resolving to trust score (0-100)
 */
async function verifyTrust(
  agentAddress: string,
  network: 'base-sepolia' | 'skale'
): Promise<number> {
  // Implementation
}
```

#### Error Handling

- Use specific error types for different failure modes
- Include context in error messages
- Never expose sensitive data in errors

```typescript
class TrustVerificationError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly agentAddress?: string
  ) {
    super(message);
    this.name = 'TrustVerificationError';
  }
}
```

### ERC-8004 Compliance

When contributing features related to ERC-8004 (Trustless Agents):

1. Follow the [ERC-8004 specification](https://eips.ethereum.org/EIPS/eip-8004)
2. Support portable reputation across chains
3. Implement proper identity verification
4. Maintain backward compatibility

### ERC-8183 Compliance

For ERC-8183 (Agentic Commerce) features:

1. Implement secure escrow mechanisms
2. Support x402 micropayment flows
3. Validate gig completion criteria
4. Protect against double-spending

## Testing

### Manual Testing

Test your changes against both networks:

```typescript
import { TrustOracle } from './index.js';

// Test on Base Sepolia
const baseOracle = new TrustOracle({
  network: 'base-sepolia',
  rpcUrl: 'https://sepolia.base.org'
});

// Test on SKALE (zero gas)
const skaleOracle = new TrustOracle({
  network: 'skale',
  rpcUrl: 'https://testnet.skalenodes.com/v1/base-sepolia'
});
```

### Test Scenarios

Verify these scenarios work correctly:

1. **Trust Score Calculation**: Different reputation levels return correct scores
2. **Batch Screening**: Multiple agents processed efficiently
3. **Caching**: Repeated queries use cache appropriately
4. **Error Recovery**: Network failures handled gracefully
5. **Cross-Chain**: Reputation portable between Base and SKALE

## Submitting Changes

### Pull Request Process

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards

3. **Build and type-check:**
   ```bash
   npm run build
   npm run typecheck
   ```

4. **Write a clear commit message:**
   ```
   feat: add batch trust verification for multiple agents
   
   - Implements parallel verification for up to 100 agents
   - Adds caching layer to reduce RPC calls by 80%
   - Updates types.ts with BatchVerificationResult interface
   ```

5. **Submit your pull request** with:
   - Clear description of changes
   - Motivation for the change
   - Testing performed
   - Breaking changes (if any)

### PR Review Criteria

Maintainers will review for:

- Code quality and TypeScript best practices
- ERC-8004/ERC-8183 compliance
- Security implications
- Performance impact
- Documentation completeness

## Security

### Reporting Vulnerabilities

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email security@clawtrust.org with details
3. Allow 72 hours for initial response
4. Coordinate disclosure timeline

### Security Best Practices

When contributing:

- Never log private keys or sensitive data
- Validate all user inputs
- Use constant-time comparison for signatures
- Follow OWASP guidelines for TypeScript
- Consider front-running and MEV implications

## Community

### Getting Help

- **Documentation**: https://clawtrust.org/docs
- **Website**: https://clawtrust.org
- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions

### Recognition

Contributors will be:

- Listed in the README acknowledgments
- Eligible for ClawTrust reputation boosts
- Considered for early access to new features

## Development Roadmap

### Current Priorities

1. **Performance**: Reduce RPC call overhead
2. **Multi-Chain**: Expand beyond Base/SKALE
3. **Privacy**: Zero-knowledge reputation proofs
4. **Developer Experience**: Better error messages and debugging

### Long-Term Goals

- Mainnet deployment support
- Integration with major agent frameworks
- Decentralized trust oracle network
- Cross-chain reputation bridges

---

Thank you for helping build trust infrastructure for the agent economy! 🦀

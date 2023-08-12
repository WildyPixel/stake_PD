import { BN } from '@coral-xyz/anchor'
import { formatAmountAsDecimal } from 'common/units'
import { pubKeyUrl } from 'common/utils'
import { useRewardDistributorData } from 'hooks/useRewardDistributorData'
import { useRewardMintInfo } from 'hooks/useRewardMintInfo'
import { baseDailyRate, useRewardsRate } from 'hooks/useRewardsRate'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

export const RewardsRate = () => {
  const rewardsRate = useRewardsRate()
  const rewardDistributorData = useRewardDistributorData()
  const rewardMintInfo = useRewardMintInfo()
  const { environment } = useEnvironmentCtx()
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()

  return (
    <>
      {!rewardsRate?.data ||
      !rewardMintInfo?.data ||
      !rewardDistributorData?.data ? (
        <div className="h-6 w-10 animate-pulse rounded-md bg-border"></div>
      ) : (
        <div
          className="text-center text-xl text-light-1"
          style={{ color: stakePoolMetadata?.colors?.fontColor }}
        >
          {formatAmountAsDecimal(
            rewardMintInfo.data.mintInfo.decimals,
            baseDailyRate(rewardDistributorData.data),
            Math.min(rewardMintInfo.data.mintInfo.decimals, 3)
          )}{' '}
          <a
            href={pubKeyUrl(
            rewardDistributorData.data.parsed?.rewardMint,
            environment.label
            )}>

          </a>
          <a
            style={{
              color: stakePoolMetadata?.colors?.fontColor
                ? stakePoolMetadata?.colors?.fontColor
                : 'white',
            }}
            target="_blank"
            href='https://solscan.io/token/3vaySGGghUAeVBxqFZkgvp9Fm33pcNcucrK9BhXUnK98'
            rel="noreferrer"
          >
            {rewardMintInfo.data.metaplexMintData?.data.symbol.replace(
              /\0/g,
              ''
            ) ||
              rewardMintInfo.data.tokenListData?.symbol ||
              '???'}
          </a>{' '}
          {rewardDistributorData.data.parsed?.maxRewardSecondsReceived?.eq(
            new BN(1)
          )
            ? ''
            : '/ Day'}
        </div>
      )}
    </>
  )
}

import React, { useEffect, useState } from "react";
import { useExitKeys } from "../../hooks/useExitKeys";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";

import AtmEnter from "./enter/enter";
import AtmManage from "./manage/manage";
import AtmWallet from "./wallet/wallet";

export interface IPlayerAccounts {
	accounts: { id: number; account_number: string; balance: number; common: number }[];
	player: {
		id: number;
		firstname: string;
		lastname: string;
		job: string;
	};
}

const Atm: React.FC = () => {
	useExitKeys();

	const [state, setState] = useState<"enter" | "wallet" | "manage">("enter");
	const [wallet_id, setWalletId] = useState<string | undefined>(undefined);
	const [data, setData] = useState<IPlayerAccounts>(undefined);

	const doRefresh = async () => {
		if (isDev) {
			setData({
				accounts: [
					{
						id: 1,
						account_number: "123456789",
						balance: 100,
						common: 0,
					},
					{
						id: 2,
						account_number: "999456789",
						balance: 15000,
						common: 0,
					},
					{
						id: 3,
						account_number: "222456789",
						balance: 256000,
						common: 1,
					},
				],
				player: {
					id: 1,
					firstname: "John",
					lastname: "Doe",
					job: "LSPD",
				},
			});
		} else {
			const result = await postAsync("bank__GetAllPlayerAccount", {});
			setData(result.data);
		}
	};

	useEffect(() => {
		doRefresh();
	}, []);

	return (
		<>
			{state === "enter" && <AtmEnter onNext={() => setState("wallet")} />}
			{state === "wallet" && (
				<AtmWallet
					data={data}
					onManage={id => {
						setWalletId(id.toString());
						setState("manage");
					}}
				/>
			)}
			{state === "manage" && <AtmManage data={data} doRefresh={doRefresh} wallet_id={wallet_id} />}
		</>
	);
};

export default Atm;

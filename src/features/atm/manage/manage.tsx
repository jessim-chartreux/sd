import "./manage.scss";

import React, { useEffect, useState } from "react";

import { IPlayerAccounts } from "../atm";
import Input from "../../../shared/input";
import { isDev } from "../../../utils/isDev";
import { postAsync } from "../../../utils/postAsync";

interface ITransactions {
	label: string;
	amount: number;
}

const AtmManage: React.FC<{ data: IPlayerAccounts; wallet_id?: string; doRefresh: () => Promise<any> }> = props => {
	const numberWithSpaces = (x: string) => {
		return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	};

	const [amount, setAmount] = useState<string>("");
	const [transfert, setTransfert] = useState<{
		amount: string;
		message: string;
		accountNumber: string;
	}>({
		amount: "",
		message: "",
		accountNumber: "",
	});

	const [transactions, setTransactions] = useState<ITransactions[]>([]);
	const activeWallet = props.data?.accounts.find(acc => acc.id === parseInt(props.wallet_id));
	useEffect(() => {
		if (activeWallet) {
			if (isDev) {
				setTransactions([
					{
						label: "Transaction 1",
						amount: 100,
					},
					{
						label: "Transaction 2",
						amount: -100,
					},
					{
						label: "Transaction 3",
						amount: 448484,
					},
				]);
			} else {
				(async () => {
					const result = await postAsync("bank__GetTransactions", { accountId: activeWallet?.id });
					setTransactions(result.data);
				})();
			}
		} else {
			setTransactions([]);
		}
	}, [activeWallet]);

	const doTransfert = async () => {
		if (+transfert.amount > 0 && transfert.accountNumber) {
			await postAsync("bank__Transfer", {
				from_wallet_id: parseInt(props.wallet_id),
				amount: transfert.amount,
				message: transfert.message,
				account_number: transfert.accountNumber,
			});
			setTransfert({
				amount: "",
				message: "",
				accountNumber: "",
			});
			await props.doRefresh();
		}
	};

	const doDeposit = async () => {
		if (+amount > 0) {
			await postAsync("bank__Deposit", {
				wallet_id: props.wallet_id,
				amount: amount,
			});
			setAmount(undefined);
			await props.doRefresh();
		}
	};

	const doWithdraw = async () => {
		if (+amount > 0) {
			await postAsync("bank__Withdraw", {
				wallet_id: props.wallet_id,
				amount: amount,
			});
			setAmount(undefined);
			await props.doRefresh();
		}
	};

	return (
		<div className="atm_manage">
			<div className="atm_manage_container">
				<div className="atm_manage_header d-flex justify-content-between">
					<div className="atm_manage_header_card">
						<div>
							{activeWallet?.common == 0 && activeWallet?.id != undefined && (
								<div className="atm_manage_card red d-flex flex-column justify-content-between" id="card">
									<div className="d-flex flex-column">
										<div className="d-flex flex-column">
											<span className="atm_manage_card_text_little">FLEECA BANK</span>
											<span className="atm_manage_card_text_bigger">
												<b>{props.data?.player?.job?.toUpperCase()}</b>
											</span>
										</div>
										<span className="atm_manage_card_text_bigger mt-2">
											<b>**** **** **** ****</b>
										</span>
									</div>
									<div className="d-flex justify-content-between">
										<div className="d-flex flex-column justify-content-between">
											<div className="d-flex justify-content-between">
												<div className="d-flex flex-column">
													<span className="atm_manage_card_text_thin">EXP</span>
													<span className="atm_manage_card_text_normal">07/2035</span>
												</div>
												<div className="d-flex flex-column">
													<span className="atm_manage_card_text_thin">AGE</span>
													<span className="atm_manage_card_text_normal">0903</span>
												</div>
												<div className="d-flex flex-column">
													<span className="atm_manage_card_text_thin">CVC</span>
													<span className="atm_manage_card_text_normal">901</span>
												</div>
											</div>
											<span className="atm_manage_card_text_normal">COMPTE N°{activeWallet?.account_number}</span>
										</div>
										<div className="d-flex flex-column align-items-center">
											<img
												className="atm_manage_card_nfc"
												src="https://cdn.sacul.cloud/v2/vision-cdn/atm/nfc.webp"
												alt="NFC icon"
											/>
											<img
												className="atm_manage_card_puce"
												src="https://cdn.sacul.cloud/v2/vision-cdn/atm/puce.webp"
												alt="NFC icon"
											/>
										</div>
									</div>
								</div>
							)}
							{activeWallet?.common == 1 && activeWallet?.id != undefined && (
								<div className="atm_manage_card green d-flex flex-column justify-content-between" id="card">
									<div className="d-flex flex-column">
										<div className="d-flex flex-column">
											<span className="atm_manage_card_text_little">FLEECA BANK</span>
											<span className="atm_manage_card_text_bigger">
												<b>{props.data?.player?.lastname?.toUpperCase()}</b>{" "}
												{props.data?.player?.firstname?.toUpperCase()}
											</span>
										</div>
										<span className="atm_manage_card_text_bigger mt-2">
											<b>**** **** **** ****</b>
										</span>
									</div>
									<div className="d-flex justify-content-between">
										<div className="d-flex flex-column justify-content-between">
											<div className="d-flex justify-content-between">
												<div className="d-flex flex-column">
													<span className="atm_manage_card_text_thin">EXP</span>
													<span className="atm_manage_card_text_normal">07/2035</span>
												</div>
												<div className="d-flex flex-column">
													<span className="atm_manage_card_text_thin">AGE</span>
													<span className="atm_manage_card_text_normal">0903</span>
												</div>
												<div className="d-flex flex-column">
													<span className="atm_manage_card_text_thin">CVC</span>
													<span className="atm_manage_card_text_normal">901</span>
												</div>
											</div>
											<span className="atm_manage_card_text_normal">COMPTE N°{activeWallet?.account_number}</span>
										</div>
										<div className="d-flex flex-column align-items-center">
											<img
												className="atm_manage_card_nfc"
												src="https://cdn.sacul.cloud/v2/vision-cdn/atm/nfc.webp"
												alt="NFC icon"
											/>
											<img
												className="atm_manage_card_puce"
												src="https://cdn.sacul.cloud/v2/vision-cdn/atm/puce.webp"
												alt="NFC icon"
											/>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="atm_manage_right">
						<div className="atm_manage_header_solde">
							<h1>Balance</h1>
							<h2 className="d-flex">
								{numberWithSpaces((activeWallet?.balance || 0).toString())}
								<span>$</span>
							</h2>
						</div>
						<div className="row mt-3">
							<div className="col-6">
								<div className="col-11 atm_manage_box">
									<div className="atm_manage_box_header d-flex align-items-center justify-content-center">
										<span>Entrer un montant</span>
									</div>
									<Input
										className="atm_manage_input_payin"
										type="number"
										value={amount}
										onChange={e => setAmount(e.target.value)}
									/>
								</div>
							</div>
							<div className="col-6">
								<div className="col-12 atm_manage_btncol">
									<button className="btn atm_manage_btn_custom mb-2" onClick={doDeposit}>
										Déposer
									</button>
									<button className="btn atm_manage_btn_custom" onClick={doWithdraw}>
										Retirer
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row mt-3">
					<div className="col-8">
						<div className="atm_manage_left">
							<div className="col-11 atm_manage_box">
								<div className="atm_manage_box_header d-flex align-items-center justify-content-center">
									<span>Transactions</span>
								</div>
								<div className="atm_manage_box_scroll p-2 d-flex flex-column">
									{transactions?.map((transaction, index) => (
										<div
											key={index}
											className={`transaction ${
												transaction.amount < 0 ? "transaction-negative" : "transaction-positive"
											}`}>
											<div className="pill"></div>
											<div className="label">{transaction.label}</div>
											<div className="amount">{numberWithSpaces(transaction.amount.toString())}$</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="col-4">
						<div className="atm_manage_right">
							<div className="col-12 atm_manage_fullbox p-3 d-flex flex-column align-items-center">
								<h1>Virement</h1>
								<Input
									type="text"
									placeholder="N° COMPTE*"
									value={transfert.accountNumber}
									onChange={e => setTransfert(state => ({ ...state, accountNumber: e.target.value }))}
								/>
								<Input
									type="number"
									placeholder="MONTANT*"
									value={transfert.amount}
									onChange={e => setTransfert(state => ({ ...state, amount: e.target.value }))}
								/>
								<Input
									type="text"
									placeholder="MOTIF"
									value={transfert.message}
									onChange={e => setTransfert(state => ({ ...state, message: e.target.value }))}
								/>
								<button className="atm_manage_fullbox_footer btn" onClick={doTransfert}>
									VALIDER
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AtmManage;

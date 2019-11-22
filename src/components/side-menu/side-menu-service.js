import React from 'react';
import { Subject } from 'rxjs';

const subject = new Subject();

export const SideMenuService = {
	showMenu: () => subject.next(true),
	hideMenu: () => subject.next(false),
	isVisible: () => subject.asObservable(),
};


#!/bin/bash


echo 'WLAN SSID: (e.g. makethingstalk_athena)'
read ssid
echo 'WLAN Password: (between 8 and 64 characters)'
read password

cp -r template_files/etc-hostapd-hostapd.boilerplate.conf template_files/etc-hostapd-hostapd.conf 
echo "ssid=$ssid" >> template_files/etc-hostapd-hostapd.conf 
echo "wpa_passphrase=$password" >> template_files/etc-hostapd-hostapd.conf 

read -p "Do you want write the config files? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    sudo rfkill unblock wlan # To ensure WiFi radio is not blocked on the Raspberry Pi

    timestamp=$(date +%s)

    echo "Backup of original config files:"
    sudo cp -r -v /etc/hostapd/hostapd.conf /etc/hostapd/hostapd.conf.bkp$timestamp
    sudo cp -r -v /etc/dnsmasq.conf /etc/dnsmasq.conf.bkp$timestamp
    sudo cp -r -v /etc/dhcpcd.conf /etc/dhcpcd.conf.bkp$timestamp

    echo "Copy WLAN access point config files:"
    sudo cp -r -v template_files/etc-hostapd-hostapd.conf /etc/hostapd/hostapd.conf
    sudo cp -r -v template_files/etc-dnsmasq.conf /etc/dnsmasq.conf

    sudo cp -r -v template_files/etc-dhcpcd.no_ap.conf /etc/dhcpcd.no_ap.conf
    sudo cp -r -v template_files/etc-dhcpcd.ap.conf /etc/dhcpcd.ap.conf
fi


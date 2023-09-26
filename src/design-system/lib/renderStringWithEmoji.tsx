import React, { Fragment } from "react";
import type { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";
import createEmojiRegex from "emoji-regex";

const emojiRegex = createEmojiRegex();
const styles = StyleSheet.create({
  emoji: {
    color: "black",
    fontFamily: "System",
  },
});

/**
 * Without this, the `line-height` goes off when
 * an emoji is included in the text
 * @param stringNode
 * @returns React.JSX.Element
 */
export const renderStringWithEmoji = (stringNode: ReactNode) => {
  const strings = Array.isArray(stringNode) ? stringNode : [stringNode];
  return (
    <Fragment>
      {strings.map((string) => {
        if (typeof string !== "string") {
          return string;
        }

        const emojis = string.match(emojiRegex);
        if (emojis === null) return string;

        return string.split(emojiRegex).map((stringPart, index) => (
          <Fragment key={index}>
            {stringPart}
            {emojis[index] ? (
              <Text style={styles.emoji}>{emojis[index]}</Text>
            ) : null}
          </Fragment>
        ));
      })}
    </Fragment>
  );
};
